import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'lib-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
    @Input('data') data: any;
    @Input('fakeData') fakeData: any;
    @Output() callback = new EventEmitter<any>();

    constructor() { }

    ngOnChanges(): void {
        this.fakeData = [...this.fakeData];
    }

    ngOnInit(): void {
    }

    callBackDeleteItem = (item: any) => {
        this.callback.emit(item);
    }

}
