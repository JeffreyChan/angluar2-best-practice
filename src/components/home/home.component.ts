import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { FormValidatorService } from '../../services/form-validator.service';
import { User } from '../../model/user.model';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public userForm: FormGroup;
    errorMessage: string;
    public users: any[];

    constructor(private fb: FormBuilder, private _userService: UserService, private _formValidatorService: FormValidatorService) {

    }

    ngOnInit() {
        this.buildForm();
        this.getUsers();
    }

    buildForm(): void {
        this.userForm = this.fb.group({
            'userName': ['', [Validators.required, Validators.minLength(5)], this._formValidatorService.checkUserName.bind(this)],
        });
    }

    getUsers() {
        this._userService
            .getUsers()
            .subscribe(
            data => this.users = data,
            error => this.errorMessage = <any>error
            );
    }

    addUser() {
        console.log(this.userForm.value);
        if (!this.userForm.valid) { return; }
        this._userService.addUser(this.userForm.value.userName)
            .subscribe(
            hero => {
                this.users.push(hero)
                this.userForm.reset();
            },
            error => this.errorMessage = <any>error);


    }
}
