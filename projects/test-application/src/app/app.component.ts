import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test-application';
  textSearch: FormControl = new FormControl();
  searchItemsServer(ev: any) {
    console.log(ev);
  }
  searchItemsClient(ev: any) {
    console.log(ev);
  }
}
