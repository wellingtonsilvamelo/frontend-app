import { CustomModalService } from './../custom-modal.service';
import { CustomModalComponent } from './../custom-modal/custom-modal.component';
import { ApiService } from './../api.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Task } from '../model/task';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, NgForm } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [CustomModalService]
})
export class TodoListComponent implements OnInit {

  returnedArray: Task[];
  contentArray: Task[] = new Array();
  debounceTimer = null;
  task: Task = new Task();
  itemsPerPage: number = 4;
  isLoadingResults: Boolean = false;
  modalRef: BsModalRef;
  template: TemplateRef<any>;
  currentPage: number = 1;

  @ViewChild('taskModalForm', { static: false }) taskModalForm: ModalDirective;
  @ViewChild('f', { static: false }) form: TaskFormComponent;

  constructor(
    private _api: ApiService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private customModalService: CustomModalService) { }

  ngOnInit() {
    this.getTasks();
  }

  confirmYourChoice(task: Task) {
    this.task = task;
    this.customModalService.openModal("Remover Ítem", "Tem certeza que quer remover este ítem?");
  }

  getTasks() {
    this.isLoadingResults = true;
    this._api.getTasks()
      .subscribe(res => {
        this.contentArray = res.data;
        this.isLoadingResults = false;
        //this.returnedArray = this.contentArray.slice(this.currentPage-1, this.itemsPerPage);
        this.pageChanged({itemsPerPage: this.itemsPerPage, page: this.currentPage});
      }, err => {
        this.toastr.error(this.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

  search(searchParam: string) {
    this._api.searchTasks(searchParam)
      .subscribe(res => {
        this.contentArray = res.data;
        this.pageChanged({itemsPerPage: this.itemsPerPage, page: this.currentPage});
        this.isLoadingResults = false;
      }, err => {
        this.toastr.error(this.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

  save(f: NgForm){
    console.log(f.value);
    console.log(this.task);
    this.taskModalForm.hide();
  }
  /*save(task: Task) {
    this._api.saveTask(task)
      .subscribe(res => {
        this.toastr.success(res.data.message);
        this.isLoadingResults = false;
        this.getTasks();
      }, err => {
        this.toastr.error(this.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }*/

  delete($event: Boolean) {
    if ($event) {
      this.isLoadingResults = true;
      this._api.deleteTask(this.task.id)
        .subscribe(res => {
          this.toastr.success(res.data.message);
          this.isLoadingResults = false;
          this.getTasks();         
        }, err => {
          this.toastr.error(this.getErrorMessage(err), null, {
            enableHtml: true
          });
          this.isLoadingResults = false;
        });
    }
  }

  confirmDelete(task: Task) {
    this.task = task;
    // this.myModel.openModal();
  }

  /*onSubmit(form: any) {
    console.log(form);
    this.save(this.task);
  }*/

  private getErrorMessage(err): string {
    let message: string = '<ul class="list-errors">';
    if (err.error.errors) {
      if (err.error.errors.length > 1) {
        err.error.errors.forEach((item) => {
          message += `<li>${item}</li>`
        });
      } else if (err.error.errors.length == 1) {
        message = err.error.errors[0];
      }
    } else {
      message = err.message;
    }
    return `${message}</ul>`;
  }

  detail(task: Task) {
    this.task = task;
    this.taskModalForm.show();
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: PageChangedEvent): void {
    if(this.mountReturnedArray(event).length == 0){
      event.page--;
      this.mountReturnedArray(event);
    }
  }

  mountReturnedArray(event: PageChangedEvent): Task[] {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    return this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  onKeyUp(value) {
    this.isLoadingResults = true;
    clearTimeout(this.debounceTimer);
    // armazenamos o timer novamente
    this.debounceTimer = setTimeout(() => {
      this.search(value);
    }, 500);
  }

  modalShowHandler(event) {
    this.task = new Task();    
  }

  modalHideHandler(event: any) {
    this.task = new Task();
    this.form.resetForm();
  }

  confirmResult(event: any) {
    console.log(event.value);
  }

  // openModal(id: string) {
  //   //this.myModalService.open(id);
  // }

  closeModal(id: string) {
    //this.myModalService.close(id);
  }

  getModalConfirmTemplate(event: any) {
    this.template = event.template;
    console.log(event.value);
  }

}
