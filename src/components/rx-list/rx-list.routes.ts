import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';


import { RxListComponent } from './rx-list.component';

import { SmartSearchComponent } from './smart-search/smart-search.component';
import { PaginatedListComponent } from './paginated-list/paginated-list.component';
import { WhoToFollowComponent } from './who-to-follow/who-to-follow.component';


const rxListRoutest: Routes = [
    {
        path: '', component: RxListComponent,
        children: [
             {path:'', pathMatch: 'full', redirectTo: 'smart-search'},
            { path: 'smart-search', component: SmartSearchComponent },
            { path: 'paginated-list', component: PaginatedListComponent },
            { path: 'who-to-follow', component: WhoToFollowComponent },
        ]
    }
];

export const RxListRoutintg:ModuleWithProviders = RouterModule.forChild(rxListRoutest);