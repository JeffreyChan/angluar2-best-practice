import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Payment, CardInfo, BankInfo } from '../../../model/payment.model';

/*import './customer.component.scss';*/

import { FormControlService } from '../../../services/form-control.service'

@Component({
    selector: 'payment-component',
    templateUrl: 'payment.component.html',
})
export class PaymentComponent implements OnInit {

    public paymentForm: FormGroup;

    // standing data
    public PAYMENT_METHOD_TYPE = {
        BANK: 'bank',
        CARD: 'card'
    };

    public PaymentType: string;

    constructor(private _fb: FormBuilder, private _formService: FormControlService) {
    }

    onSubmit() {

    }

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
        this.paymentForm = this._fb.group({
            'name': ['', [Validators.required, Validators.minLength(5)]],
            'paymentMethod': this.initPaymentMethodFormGroup()
        });

        this.paymentForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        const paymentGroup = this.paymentForm.get('paymentMethod') as FormGroup;
        var ctrlPaymenType = paymentGroup.get('paymentType') as FormControl;

        ctrlPaymenType.valueChanges
            .subscribe(paymentType => this.subscribePaymentTypeChanges(paymentType));

        this.setPaymentMethodType(this.PAYMENT_METHOD_TYPE.BANK);
    }

    subscribePaymentTypeChanges(paymentType?: any) {
        const paymentGroup = this.paymentForm.get('paymentMethod') as FormGroup;
        const bankInfoGroup = paymentGroup.get('bankInfo') as FormGroup;
        const cardInfoGroup = paymentGroup.get('cardInfo') as FormGroup;

        if (paymentType === this.PAYMENT_METHOD_TYPE.BANK) {
            Object.keys(bankInfoGroup.controls).forEach(key => {
                bankInfoGroup.controls[key].setValidators(this.initPaymentMethodBankModel()[key][1]);
                bankInfoGroup.controls[key].updateValueAndValidity();
            });

            Object.keys(cardInfoGroup.controls).forEach(key => {
                cardInfoGroup.controls[key].setValidators(null);
                cardInfoGroup.controls[key].updateValueAndValidity();
            });
        }
        else {
            Object.keys(bankInfoGroup.controls).forEach(key => {
                bankInfoGroup.controls[key].setValidators(null);
                bankInfoGroup.controls[key].updateValueAndValidity();
            });

            Object.keys(cardInfoGroup.controls).forEach(key => {
                cardInfoGroup.controls[key].setValidators(this.initPaymentMethodCardModel()[key][1]);
                cardInfoGroup.controls[key].updateValueAndValidity();
            });
        }
    }

    onValueChanged(data?: any) {
        if (!this.paymentForm) return;

        // handle main form errors
        this.onFormValueChanged();

        // handle bank errors
        this.onBankGroupValueChanged();

        // handle card errors
        this.onCardGroupValueChanged();
    }

    /* Update Main Form Validations */
    onFormValueChanged() {
        const mainGroup = this.paymentForm;

        // setup fields to validate and the messages
        const fields = { name: '' };

        const refErrors = this._formService.handleValidations(fields, this.validationMessages, mainGroup);
        this.formErrors = Object.assign(this.formErrors, refErrors);
    }

    /* Update BankInfo Validation */
    onBankGroupValueChanged() {
        const paymentGroup = this.paymentForm.get('paymentMethod') as FormGroup;
        const bankGroup = paymentGroup.get('bankInfo') as FormGroup;

        // setup fields to validate and the messages
        const fields = {
            accountNo: '',
            accountHolder: '',
            routingNo: ''
        };

        const refErrors = this._formService.handleValidations(fields, this.validationMessages, bankGroup);
        this.bankInfoErrors = Object.assign(this.bankInfoErrors, refErrors);
    }

    /* Update BankInfo Validation */
    onCardGroupValueChanged() {
        const paymentGroup = this.paymentForm.get('paymentMethod') as FormGroup;
        const bankGroup = paymentGroup.get('cardInfo') as FormGroup;

        // setup fields to validate and the messages
        const fields = {
            cardNo: '',
            cardHolder: '',
            expiry: ''
        };

        const refErrors = this._formService.handleValidations(fields, this.validationMessages, bankGroup);
        this.cardInfoErrors = Object.assign(this.cardInfoErrors, refErrors);
    }

    initPaymentMethodFormGroup(): FormGroup {
        // initialize payment method form group
        const group = this._fb.group({
            paymentType: [''],
            cardInfo: this._fb.group(this.initPaymentMethodCardModel()),
            bankInfo: this._fb.group(this.initPaymentMethodBankModel()),
        });

        return group;
    }

    initPaymentMethodCardModel(): any {
        // you get valid testing credit card from http://www.getcreditcardnumbers.com/
        const cardNoRegex = `^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$`;
        const expiryRegex = `^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$`;

        // initialize card model
        const model = {
            cardNo: ['', [Validators.required, Validators.pattern(cardNoRegex)]],
            cardHolder: ['', Validators.required],
            expiry: ['', [Validators.required, Validators.pattern(expiryRegex)]]
        };

        return model;
    }

    initPaymentMethodBankModel(): any {
        // initialize bank model
        const model = {
            accountNo: ['', Validators.required],
            accountHolder: ['', Validators.required],
            routingNo: ['', Validators.required]
        };

        return model;
    }

    setPaymentMethodType(type: string) {
        // update payment method type value
        var payMethodGroup = this.paymentForm.get('paymentMethod') as FormGroup;
        const ctrl: FormControl = payMethodGroup.get('paymentType') as FormControl;
        ctrl.setValue(type);

        this.PaymentType = type;
    }

    formErrors: any = {
        'name': ''
    };

    bankInfoErrors: any = {};

    cardInfoErrors: any = {};

    validationMessages: any = {
        'name': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 5 characters long.'
        },
        'accountNo': {
            'required': 'AccountNo is required.',
        },
        'accountHolder': {
            'required': 'AccountHolder is required.',
        },
        'routingNo': {
            'required': 'RoutingNo is required.',
        },
        cardNo: {
            'required': 'CardNo is required.',
            'pattern': 'Must be valid card number.'
        },
        cardHolder: {
            'required': 'CardHolder is required.'
        },
        expiry: {
            'required': 'CardNo is required.',
            'pattern': 'Must be in format MM/YY'
        },
    };
}