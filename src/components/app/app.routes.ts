import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { PersonComponent } from '../person/person.component';
import { CustomerComponent } from '../customer/customer.component';
import { PaymentComponent } from '../payment/payment.component';

const lazyListRoutes: Routes = [
    {
        path: 'form-list',
        loadChildren: '../form-list/form-list.module#FormListModule'
    },
    {
        path: 'rx-list',
        loadChildren: '../rx-list/rx-list.module#RxListModule'
    },
];

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'static-reactive-form', component: PersonComponent },
    { path: 'dynamic-reactive-form', component: CustomerComponent },
    { path: 'conditional-reactive-form', component: PaymentComponent },
    ...lazyListRoutes,
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(appRoutes);