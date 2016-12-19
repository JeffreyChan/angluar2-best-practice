import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PersonComponent } from './person/person.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentComponent } from './payment/payment.component';
import { TestDataService } from './services/testDataService';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'static-reactive-form', component: PersonComponent },
    { path: 'dynamic-reactive-form', component: CustomerComponent },
    { path: 'conditional-reactive-form', component: PaymentComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(appRoutes);