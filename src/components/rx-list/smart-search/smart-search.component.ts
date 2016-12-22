import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { User } from '../../../model/user.model';

import { Observable } from 'rxjs/Rx';

import { UserService } from '../../../services/user.service'


@Component({
    selector: 'smart-search',
    templateUrl: 'smart-search.component.html',
    
})

export class SmartSearchComponent implements OnInit {

    userList: Observable<User[]>;
    userNameCtrl: FormControl = new FormControl();

    errorMessage: string;

    constructor(private _userService: UserService) {

    }

    ngOnInit(): void {
        this.userList = this.userNameCtrl.valueChanges
            .filter(x => x.length > 2)
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(value => this._userService.searchUsers(value));

    }
}
