import { Component, OnInit } from '@angular/core';
import { ListComponent } from '@ci/base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentPage = 0;
  items = [1, 2, 3, 4, 5];
  constructor() {
    // super();
  }

  ngOnInit(): void {}

  test(ev: any) {
    console.log(ev);
    this.currentPage = ev;
  }
}
