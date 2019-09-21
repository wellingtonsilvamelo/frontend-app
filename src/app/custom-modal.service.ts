import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomModalService {

  modalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  openModal(title: string, message: string) {
    this.modalEvent.emit({ fn: "openModal", title: title, message: message });
  }

  resetForm() {
    this.modalEvent.emit({ resetForm: "resetForm" });
  }
}
