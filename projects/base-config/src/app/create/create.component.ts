import { Component, OnInit } from '@angular/core';
import { Test1Model } from '../../common/model/test1.model';

@Component({
    selector: 'app-create',
    template: '<lib-form-create [(data)]="formCreate" (callback)="callBackData($event)"></lib-form-create>'
})
export class CreateComponent implements OnInit {
    model = new Test1Model;
    formCreate: any;

    constructor() { }

    ngOnInit() {
        this.formCreate = this.model.viewCreate;
    }

    callBackData = (data: any) => {
        console.log(data);
    }

}
