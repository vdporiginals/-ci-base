import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'lib-form-create',
    templateUrl: './form-create.component.html',
    styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {
    @Input() data: any;
    @Output() callback = new EventEmitter<any>();
    model: any = {};

    constructor() { }

    ngOnInit(): void {
        console.log(this.data);
    }

    callBackData = () => {
        this.callback.emit(this.model);
    }

}
