import { Injectable } from '@angular/core';

import { FormControl } from '@angular/forms';
import { ReflectiveInjector } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UserService } from "./user.service";


import { User } from '../model/user';



@Injectable()
export class FormValidatorService {

    constructor(private _userService: UserService) { }

    checkUserName(control: FormControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
        // Return an observable with null if the username doesn't yet exist
        // or an objet with the rejetion reason if they do
        return new Observable((obs: any) => {
            control
                .valueChanges
                .debounceTime(400)
                .flatMap(value => this._userService.getUserByName(value))
                .subscribe(
                data => {
                    if (Object.keys(data).length === 0) {
                        obs.next(null);
                        obs.complete();
                    }
                    else {
                        obs.next({ ['usernameTaken']: true });
                        obs.complete();
                    }
                },
                error => {
                    obs.next({ ['usernameTaken']: true });
                    obs.complete();
                }
                );
        });
    }
}