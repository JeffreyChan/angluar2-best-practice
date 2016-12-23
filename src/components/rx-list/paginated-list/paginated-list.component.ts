import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { User } from '../../../model/user.model';

import { Observable } from 'rxjs/Rx';

import { UserService } from '../../../services/user.service'


@Component({
    selector: 'paginated-list',
    templateUrl: 'paginated-list.component.html',
    
})

export class PaginatedListComponent implements OnInit {

    userList: Observable<User[]>;
    userNameCtrl: FormControl = new FormControl();

    errorMessage: string;

    constructor(private _userService: UserService) {

    }

    ngOnInit(): void {
      
    }
}
