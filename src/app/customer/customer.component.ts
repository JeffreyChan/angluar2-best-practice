import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../model/customer.model';

/*import './customer.component.scss';*/

@Component({
    selector: 'customer-component',
    templateUrl: 'customer.component.html',
})
export class CustomerComponent implements OnInit {
    public customerForm: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit() {
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

    initAddress() {
        return this._fb.group({
            'street': ['', Validators.required],
            'postcode': ['']
        });
    }

    addAddress() {
        const control = <FormArray>this.customerForm.controls['addresses'];
        const addrCtrl = this.initAddress();

        control.push(addrCtrl);

    }

    removeAddress(i: number) {
        const control = <FormArray>this.customerForm.controls['addresses'];
        control.removeAt(i);
    }

    onSubmit() {

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

        const refErrors = this.handleValidations(fields, custF);
        this.formErrors = Object.assign(this.formErrors, refErrors);
    }

    /* Update Addresses Validation */
    onAddrsValueChanged() {
        const addrsF = this.customerForm.get('addresses') as FormArray;

        // setup fields to validate and the messages
        const fields = { street: '' };

        addrsF.controls.forEach((val, idx) => {
            const refErrors = this.handleValidations(fields, addrsF.get(idx.toString()) as FormGroup);
            this.addressErrors = Object.assign(this.addressErrors, { [idx]: refErrors });
        });
    }

    handleValidations(fs: any, fg: FormGroup) {
        // avoid mutation
        const fields = Object.assign({}, fs);

        for (const field in fields) {
            const control = fg.get(field);

            if (control && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    fields[field] += messages[key] + ' ';
                }
            }
        }

        return fields;
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