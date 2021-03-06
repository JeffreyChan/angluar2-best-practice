import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {FormListRoutintg} from './form-list.routes';

import { FormListComponent } from './form-list.component';

import { PowerfulFormComponent } from './powerful-form/powerful-form.component';
import { ExtendedInputComponent } from './powerful-form/extended-input.component';
import { TabComponent } from './tabs/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabHoldComponent } from './tabs/tabhold.component';
import { PersonComponent } from './person/person.component';
import { AddressComponent } from './customer/address.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentComponent } from './payment/payment.component';
import { RegistrationComponent } from './registration/registrationcomponent';


import { FormControlService } from '../../services/form-control.service';

import { EmailValidator } from '../../directive/email-validator.directive';
import { EqualValidator } from '../../directive/equal-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormListRoutintg
    ],
    declarations: [
        FormListComponent,
        PersonComponent,
        AddressComponent,
        CustomerComponent,
        PaymentComponent,
        ExtendedInputComponent,
        PowerfulFormComponent,
        TabComponent,
        TabsComponent,
        TabHoldComponent,
        RegistrationComponent,
        EmailValidator,
        EqualValidator
    ],
    providers: [FormControlService],
    exports: [FormListComponent],
})
export class FormListModule { }