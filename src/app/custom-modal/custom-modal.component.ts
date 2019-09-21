import { element } from 'protractor';
import { CustomModalService } from './../custom-modal.service';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef, ViewChild, Output, EventEmitter, AfterViewInit, ViewContainerRef, ElementRef, Input } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent implements OnInit, AfterViewInit {

  modalRef: BsModalRef;
  @ViewChild('childModal', { static: false }) customModal: ModalDirective;
  @ViewChild('childModal', { static: false }) modalHTML: ElementRef;
  @Output() emittTemplate = new EventEmitter();
  @Output() modalChoiceEvent = new EventEmitter<Boolean>();
  @Output() handlerModalEvent = new EventEmitter<ModalDirective>();
  @Input() modalId: string;
  modalMessage: string;
  modalTitle: string;

  //@ViewChild('template', { static: false }) templateEmitter: TemplateRef<any>;

  constructor(private modalService: BsModalService, private customModalService: CustomModalService, private elr: ElementRef) {}

  ngOnInit() {
    this.customModalService.modalEvent.subscribe((event: any) => {
      this.modalTitle = event.title;
      this.modalMessage = event.message;
      this[event.fn]();
    });
  }

  ngAfterViewInit() {
    console.log(this.modalHTML);
    //this.emittTemplate.emit({ template: this.templateEmitter });
  }
 
  openModal(/*template: TemplateRef<any>*/) {
    //this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.customModal.show();
    let html: HTMLElement = this.elr.nativeElement;
    console.log(html.id/*firstElementChild.id*/);
  }
 
  confirm(): void {
    //this.modalRef.hide();
    this.modalChoiceEvent.emit(true);
    this.customModal.hide();
  }
 
  decline(): void {
    //this.modalRef.hide();
    this.modalChoiceEvent.emit(false);
    this.customModal.hide();
  }

  handler($event: ModalDirective){
    this.handlerModalEvent.emit($event);
  }

}
