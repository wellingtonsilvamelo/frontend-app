import { CustomModalService } from './../custom-modal.service';
import { ApiService } from './../api.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup
  task: Task = new Task();

  constructor(private formBuilder: FormBuilder, private _api: ApiService, private customModalService: CustomModalService) { }

  ngOnInit() {
    // this.taskForm = new FormGroup({
    //    title: new FormControl(null),
    //    description: new FormControl(null)
    // });
    // Outra forma de instanciar o FormControl
    this.taskForm = this.formBuilder.group({
      title: [null],
      description: [null]
    });

    this.customModalService.modalEvent.subscribe((event: any) => {
      this[event.resetForm]();
    });
  }

  onSubmit(){
    this.task.title = this.taskForm.value.title;
    this.task.text = this.taskForm.value.description;
    console.log(this.taskForm.value);
    this.taskForm.reset();
  }

  resetForm(){
    this.taskForm.reset();
    console.log(this.taskForm);
  }

}
