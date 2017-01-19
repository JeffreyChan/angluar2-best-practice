import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormControlService } from '../../../services/form-control.service';

@Component({
    selector: 'power-form',
    templateUrl: 'powerful-form.component.html',
})
export class PowerfulFormComponent implements OnInit {

    powerForm: FormGroup;
    someNumber: FormControl;

    formErrors: any = {
        'someNumber': ''
    };

    addressErrors: any = {};

    validationMessages: any = {
        'someNumber': {
            'required': 'A number is required',
            'divisibleByTen': 'The number should be divisible by 10',
            'minlength': 'The number should be at least 7 digits'
        }
    };
    constructor(private fb: FormBuilder, private _formService: FormControlService) {
    }

    divisibleByTen(control: FormControl) {
        return parseInt(control.value) % 10 == 0 ? null : {
            divisibleByTen: true
        };
    }

    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.powerForm = this.fb.group({
            'someNumber': ['', [Validators.required,
            Validators.minLength(7)]
            ],
        });

        this.someNumber = this.powerForm.get('someNumber') as FormControl;
        this.powerForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    onValueChanged(data?: any) {
        if (!this.powerForm) {
            return;
        }
        // handle main form errors
        this.onFormValueChanged();
    }

    /* Update Main Form Validations */
    onFormValueChanged() {

        const custF = this.powerForm;

        // setup fields to validate and the messages
        const fields = { someNumber: '' };

        const refErrors = this._formService.handleValidations(fields, this.validationMessages, custF);
        this.formErrors = Object.assign(this.formErrors, refErrors);
    }
}