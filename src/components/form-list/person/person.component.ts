import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Person } from '../../../model/person.model';

import { FormControlService } from '../../../services/form-control.service'

@Component({
    selector: 'person-component',
    templateUrl: 'person.component.html'
})

export class PersonComponent implements OnInit {

    public personForm: FormGroup;

    public person: Person = new Person(0, '', '', 0);

    submitted = false;

    constructor(private fb: FormBuilder, private _formService: FormControlService) {

    }

    ngOnInit(): void {
        this.buildForm();
    }

    onSubmit() {
        this.submitted = true;
        this.person = this.personForm.value;
    }

    buildForm(): void {
        this.personForm = this.fb.group({
            'name': [this.person.PersonName, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24)]
            ],
            'email': [this.person.Email, Validators.required],
            'age': [this.person.Age, Validators.required]
        });

        this.personForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
        if (!this.person) { return; }
        // handle main form errors
        this.onFormValueChanged();
    }

    /* Update Main Form Validations */
    onFormValueChanged() {

        const personF = this.personForm;

        // setup fields to validate and the messages
        const fields = {
            'name': '',
            'email': '',
            'age': ''
        };

        const refErrors = this._formService.handleValidations(fields, this.validationMessages, personF);
        this.formErrors = Object.assign(this.formErrors, refErrors);
    }

    formErrors: any = {};

    validationMessages: any = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.',
        },
        'email': {
            'required': 'Email Address is required.'
        },
        'age': {
            'required': 'Email Address is required.'
        }
    };
}
