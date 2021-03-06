import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';


import { Configuration } from './app.constants';
import { routing } from './app.routes';

import { ServicesModule } from '../../services/service.module';

import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

import { requestOptionsProvider }   from '../../services/default-request-options.service';
import { TestDataService } from '../../services/testDataService';


@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        routing,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        ServicesModule
    ],
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }