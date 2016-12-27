import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';


import { FormListComponent } from './form-list.component';

import { PowerfulFormComponent } from './powerful-form/powerful-form.component';
import { PersonComponent } from './person/person.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentComponent } from './payment/payment.component';
import { TabHoldComponent } from './tabs/tabhold.component';


const formListRoutest: Routes = [
    {
        path: '', component: FormListComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'powerful-form' },
            { path: 'powerful-form', component: PowerfulFormComponent },
            { path: 'tabs', component: TabHoldComponent },
            { path: 'static-reactive', component: PersonComponent },
            { path: 'dynamic-reactive', component: CustomerComponent },
            { path: 'conditional-reactive', component: PaymentComponent }
        ]
    }
];

export const FormListRoutintg: ModuleWithProviders = RouterModule.forChild(formListRoutest);