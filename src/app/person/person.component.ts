import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Person } from '../model/person.model';

@Component({
    selector: 'person-component',
    templateUrl: 'person.component.html'
})

export class PersonComponent implements OnInit {

    public personForm: FormGroup;

    public person: Person = new Person(0, '', '', 0);

    submitted = false;

    constructor(private fb: FormBuilder) {

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

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if (!this.person) { return; }
        const form = this.personForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors: any = {
        'name': '',
        'email': '',
        'age': ''
    };

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
