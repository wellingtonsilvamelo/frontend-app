import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() callOnInit = new EventEmitter<Event>();

  constructor() { }

  ngOnInit() {
    this.callOnInitSibling(event);
  }

  callOnInitSibling(event: Event): void {
    this.callOnInit.emit(event);
  }

}
