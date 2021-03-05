import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-list',
    template: '<lib-form-list [(data)]="data13" [fakeData]= "fakeData" (callback)="callBackDeleteItem($event)"></lib-form-list>'
})
export class ListComponent implements OnInit {
    data13: any = [];
    fakeData = [
        {
            "id": "1",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 1",
            "store": "store 1",
            "created_at": 1614588505,
            "received_at": 1614588505,
            "status_name": "status_name 1",
            "total_quantity": 19,
            "total_price": 89,
            "note": "note 1",
            "updated_at": "updated_at 1"
        },
        {
            "id": "2",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 2",
            "store": "store 2",
            "created_at": 1614588445,
            "received_at": 1614588445,
            "status_name": "status_name 2",
            "total_quantity": 71,
            "total_price": 52,
            "note": "note 2",
            "updated_at": "updated_at 2"
        },
        {
            "id": "3",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 3",
            "store": "store 3",
            "created_at": 1614588385,
            "received_at": 1614588385,
            "status_name": "status_name 3",
            "total_quantity": 52,
            "total_price": 55,
            "note": "note 3",
            "updated_at": "updated_at 3"
        },
        {
            "id": "4",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 4",
            "store": "store 4",
            "created_at": 1614588325,
            "received_at": 1614588325,
            "status_name": "status_name 4",
            "total_quantity": 80,
            "total_price": 56,
            "note": "note 4",
            "updated_at": "updated_at 4"
        },
        {
            "id": "5",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 5",
            "store": "store 5",
            "created_at": 1614588265,
            "received_at": 1614588265,
            "status_name": "status_name 5",
            "total_quantity": 19,
            "total_price": 12,
            "note": "note 5",
            "updated_at": "updated_at 5"
        },
        {
            "id": "6",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 6",
            "store": "store 6",
            "created_at": 1614588205,
            "received_at": 1614588205,
            "status_name": "status_name 6",
            "total_quantity": 85,
            "total_price": 19,
            "note": "note 6",
            "updated_at": "updated_at 6"
        },
        {
            "id": "7",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 7",
            "store": "store 7",
            "created_at": 1614588145,
            "received_at": 1614588145,
            "status_name": "status_name 7",
            "total_quantity": 37,
            "total_price": 17,
            "note": "note 7",
            "updated_at": "updated_at 7"
        },
        {
            "id": "8",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 8",
            "store": "store 8",
            "created_at": 1614588085,
            "received_at": 1614588085,
            "status_name": "status_name 8",
            "total_quantity": 41,
            "total_price": 56,
            "note": "note 8",
            "updated_at": "updated_at 8"
        },
        {
            "id": "9",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 9",
            "store": "store 9",
            "created_at": 1614588025,
            "received_at": 1614588025,
            "status_name": "status_name 9",
            "total_quantity": 95,
            "total_price": 35,
            "note": "note 9",
            "updated_at": "updated_at 9"
        },
        {
            "id": "10",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 10",
            "store": "store 10",
            "created_at": 1614587965,
            "received_at": 1614587965,
            "status_name": "status_name 10",
            "total_quantity": 2,
            "total_price": 86,
            "note": "note 10",
            "updated_at": "updated_at 10"
        },
        {
            "id": "11",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 11",
            "store": "store 11",
            "created_at": 1614587905,
            "received_at": 1614587905,
            "status_name": "status_name 11",
            "total_quantity": 25,
            "total_price": 30,
            "note": "note 11",
            "updated_at": "updated_at 11"
        },
        {
            "id": "12",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 12",
            "store": "store 12",
            "created_at": 1614587845,
            "received_at": 1614587845,
            "status_name": "status_name 12",
            "total_quantity": 63,
            "total_price": 89,
            "note": "note 12",
            "updated_at": "updated_at 12"
        },
        {
            "id": "13",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 13",
            "store": "store 13",
            "created_at": 1614587785,
            "received_at": 1614587785,
            "status_name": "status_name 13",
            "total_quantity": 50,
            "total_price": 79,
            "note": "note 13",
            "updated_at": "updated_at 13"
        },
        {
            "id": "14",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 14",
            "store": "store 14",
            "created_at": 1614587725,
            "received_at": 1614587725,
            "status_name": "status_name 14",
            "total_quantity": 33,
            "total_price": 55,
            "note": "note 14",
            "updated_at": "updated_at 14"
        },
        {
            "id": "15",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 15",
            "store": "store 15",
            "created_at": 1614587665,
            "received_at": 1614587665,
            "status_name": "status_name 15",
            "total_quantity": 96,
            "total_price": 82,
            "note": "note 15",
            "updated_at": "updated_at 15"
        },
        {
            "id": "16",
            "created_by": {
                Name: "Thế Tài"
            },
            "source": "source 16",
            "store": "store 16",
            "created_at": 1614587605,
            "received_at": 1614587605,
            "status_name": "status_name 16",
            "total_quantity": 73,
            "total_price": 55,
            "note": "note 16",
            "updated_at": "updated_at 16"
        }
    ]
    constructor() { }

    ngOnInit(): void {
    }

    callBackDeleteItem = (data: any) => {

    }

}
