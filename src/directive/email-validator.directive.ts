import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEmail][formControlName],[validateEmail][formControl],[validateEmail][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
    ]
})
export class EmailValidator implements Validator {
    emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    
    constructor(){

    }

    validate(control: AbstractControl): { [key: string]: any } {
        if (control.value && !this.emailRegexp.test(control.value)) {
            return { invalidEmail: true };
        }
    }
}