import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-invalid-feedback',
  templateUrl: './invalid-feedback.component.html',
  styleUrls: ['./invalid-feedback.component.css']
})
export class InvalidFeedbackComponent implements OnInit {

  @Input() field: string;
  @Input() message: string;

  constructor() { }

  ngOnInit() {
    if(!this.message || this.message == ''){
      this.message = `Por favor, informe um  ${this.field}  válido!`;
    }
  }

}
