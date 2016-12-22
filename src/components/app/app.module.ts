import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { Configuration } from './app.constants';
import { routing } from './app.routes';

import { CustomerModule } from '../customer/customer.module';
import { PersonModule } from '../person/person.module';
import { PaymentModule } from '../payment/payment.module';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

import { requestOptionsProvider }   from '../../services/default-request-options.service';
import { TestDataService } from '../../services/testDataService';
import { UserService } from '../../services/user.service';


import { UserData } from '../../model/user-data';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        routing,
        HttpModule,
        CustomerModule,
        PersonModule,
        PaymentModule,
        InMemoryWebApiModule.forRoot(UserData)
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent
    ],
    providers: [
        requestOptionsProvider,
        TestDataService,
        Configuration,
        UserService
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }