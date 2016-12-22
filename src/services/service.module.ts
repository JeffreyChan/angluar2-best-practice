import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DefaultRequestOptions } from './default-request-options.service';
import { FormControlService } from './form-control.service';
import { FormValidatorService } from './form-validator.service';
import { TestDataService } from './testDataService';
import { UserService } from './user.service';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        DefaultRequestOptions,
        FormControlService,
        FormValidatorService,
        TestDataService,
        UserService],
})
export class ServicesModule { }