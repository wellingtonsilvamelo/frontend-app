import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isLogged: Boolean = false;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("ACCESS_TOKEN")){
      this.isLogged = true;
    }
  }

}
