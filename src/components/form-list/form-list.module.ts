import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FormListRoutintg} from './form-list.routes'

import { FormListComponent } from './form-list.component';

import { PersonComponent } from './person/person.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentComponent } from './payment/payment.component';


import { FormControlService } from '../../services/form-control.service'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormListRoutintg
    ],
    declarations: [
        FormListComponent,
        PersonComponent,
        CustomerComponent,
        PaymentComponent
    ],
    providers: [FormControlService],
    exports: [FormListComponent],
})
export class FormListModule { }