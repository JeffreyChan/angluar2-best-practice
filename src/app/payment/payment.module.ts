import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PaymentComponent } from './payment.component';

import { FormControlService } from '.././services/form-control.service'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        PaymentComponent
    ],
    providers: [FormControlService],
    exports: [PaymentComponent],
})
export class PaymentModule { }