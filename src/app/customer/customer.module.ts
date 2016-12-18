import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CustomerComponent }  from './customer.component';
import { AddressComponent }  from './address.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        CustomerComponent,
        AddressComponent
    ],
   exports: [CustomerComponent],
})
export class CustomerModule { }