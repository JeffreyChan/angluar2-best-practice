import { Routes, RouterModule } from '@angular/router';

import { FormListRoutintg } from '../form-list/form-list.routes'
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { PersonComponent } from '../person/person.component';
import { CustomerComponent } from '../customer/customer.component';
import { PaymentComponent } from '../payment/payment.component';
import { TestDataService } from '../../services/testDataService';

const fromListRoutes: Routes = [
    {
        path: 'form-list',
        loadChildren: '../form-list/form-list.module#FormListModule'
    }
];

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'static-reactive-form', component: PersonComponent },
    { path: 'dynamic-reactive-form', component: CustomerComponent },
    { path: 'conditional-reactive-form', component: PaymentComponent },
    ...fromListRoutes,
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(appRoutes);