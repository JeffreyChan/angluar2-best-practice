import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RxListRoutintg } from './rx-list.routes'

import { RxListComponent } from './rx-list.component';
import { SmartSearchComponent } from './smart-search/smart-search.component';

import { PaginationComponent } from './paginated-list/pagination.component';
import { PaginatedListComponent } from './paginated-list/paginated-list.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RxListRoutintg
    ],
    declarations: [
        RxListComponent,
        SmartSearchComponent,
        PaginationComponent,
        PaginatedListComponent
    ],
    exports: [RxListComponent],
})
export class RxListModule { }