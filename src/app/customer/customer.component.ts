import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../model/customer.model';

/*import './customer.component.scss';*/

import { FormControlService } from '.././services/form-control.service'

@Component({
    selector: 'customer-component',
    templateUrl: 'customer.component.html',
})
export class CustomerComponent implements OnInit {
    public customerForm: FormGroup;

    constructor(private _fb: FormBuilder, private _formService: FormControlService) { }

    initAddress() {
        return this._fb.group({
            'street': ['', Validators.required],
            'postcode': ['']
        });
    }

    addAddress() {
        const control = this.customerForm.get('addresses') as FormArray;
        const addrCtrl = this.initAddress();

        control.push(addrCtrl);

    }

    removeAddress(i: number) {
        const control = this.customerForm.get('addresses') as FormArray;
        control.removeAt(i);
    }

    onSubmit() {

    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
        this.customerForm = this._fb.group({
            'name': ['', [Validators.required, Validators.minLength(5)]],
            'addresses': this._fb.array([])
        });

        // add address
        this.addAddress();

        this.customerForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        /* // HACK: trigger value changes immediately
         this.customerForm.setValue({
             name: '',
             addresses: [
                 { street: '', postcode: '' }
             ]
         });*/
    }

    onValueChanged(data?: any) {
        if (!this.customerForm) return;

        // handle main form errors
        this.onFormValueChanged();

        // handle addresses errors
        this.onAddrsValueChanged();
    }

    /* Update Main Form Validations */
    onFormValueChanged() {

        const custF = this.customerForm;

        // setup fields to validate and the messages
        const fields = { name: '' };

        const refErrors = this._formService.handleValidations(fields, this.validationMessages, custF);
        this.formErrors = Object.assign(this.formErrors, refErrors);
    }

    /* Update Addresses Validation */
    onAddrsValueChanged() {
        const addrsF = this.customerForm.get('addresses') as FormArray;

        // setup fields to validate and the messages
        const fields = { street: '' };

        addrsF.controls.forEach((val, idx) => {
            const refErrors = this._formService.handleValidations(fields,
                this.validationMessages,
                addrsF.get(idx.toString()) as FormGroup);

            this.addressErrors = Object.assign(this.addressErrors, { [idx]: refErrors });
        });
    }

    formErrors: any = {
        'name': ''
    };

    addressErrors: any = {};

    validationMessages: any = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.'
        },
        'street': {
            'required': 'Street is required.',
        }
    };
}