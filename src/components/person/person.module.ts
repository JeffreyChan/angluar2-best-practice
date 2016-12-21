import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PersonComponent } from './person.component';

import { FormControlService } from '../../services/form-control.service'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        PersonComponent
    ],
    providers: [FormControlService],
    exports: [PersonComponent],
})
export class PersonModule { }