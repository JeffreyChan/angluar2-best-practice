import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    errorMessage: string;
    public users: User[];

    constructor(private _userService: UserService) {

    }

    ngOnInit() {
        this.getUsers()
    }

    getUsers() {
        this._userService
            .getUsers()
            .subscribe(
            data => this.users = data,
            error => this.errorMessage = <any>error
            );
    }

    addUser(name: string) {
        if (!name) { return; }
        this._userService.addUser(name)
            .subscribe(
            hero => this.users.push(hero),
            error => this.errorMessage = <any>error);
    }
}
