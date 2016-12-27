import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Person } from '../../../model/person.model';

import { FormControlService } from '../../../services/form-control.service'

import { emailValidator, matchingPasswords } from '../../../directive/validators';

@Component({
    selector: 'person-component',
    templateUrl: 'registrationcomponent.html'
})

export class RegistrationComponent implements OnInit {

    public regForm: FormGroup;

    submitted = false;

    constructor(
        private fb: FormBuilder,
        private _formService: FormControlService) {

    }

    ngOnInit(): void {
        this.buildForm();
    }

    onSubmit() {
        this.submitted = true;
    }

    buildForm(): void {
        this.regForm = this.fb.group({
            'name': ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)]
            ],
            'email': ['', Validators.required, emailValidator],
            'password': ['', Validators.required],
            'confirmPassword': ['', Validators.required],
        }, { validator: matchingPasswords('password', 'confirmPassword')});

        this.regForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
        // handle main form errors
        this.onFormValueChanged();
    }

    /* Update Main Form Validations */
    onFormValueChanged() {

        const personF = this.regForm;

        // setup fields to validate and the messages
        const fields = {
            'name': '',
            'email': '',
            'password': '',
            'confirmPassword': ''
        };

        const refErrors = this._formService.handleValidations(fields, this.validationMessages, personF);
        this.formErrors = Object.assign(this.formErrors, refErrors);

        this.formErrors['confirmPassword'] = personF.hasError('mismatchedPasswords') ? "Mismatched Passwords" :'';
    }

    formErrors: any = {};

    validationMessages: any = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
        },
        'email': {
            'required': 'Email Address is required.',
            'invalidEmail': 'Invalid Email Format'
        },
        'password': {
            'required': 'password is required.'
        },
        'confirmPassword': {
            'required': 'confirm password is required.',
        }
    };
}
