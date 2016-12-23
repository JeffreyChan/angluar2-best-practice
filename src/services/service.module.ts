import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { DefaultRequestOptions } from './default-request-options.service';
import { FormControlService } from './form-control.service';
import { FormValidatorService } from './form-validator.service';
import { TestDataService } from './testDataService';
import { UserService } from './user.service';

import { UserData } from '../model/user-data';

@NgModule({
    imports: [
       /* InMemoryWebApiModule.forRoot(UserData),*/
       
    ],
    declarations: [],
    providers: [
        DefaultRequestOptions,
        FormControlService,
        FormValidatorService,
        TestDataService,
        UserService],
})
export class ServicesModule { }