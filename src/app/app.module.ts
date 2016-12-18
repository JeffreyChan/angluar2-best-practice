import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { Configuration } from './app.constants';
import { routing } from './app.routes';

import { CustomerModule } from './customer/customer.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { PersonComponent } from './person/person.component';

import { TestDataService } from './services/testDataService';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpModule,
        CustomerModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        PersonComponent
    ],
    providers: [
        TestDataService,
        Configuration
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }