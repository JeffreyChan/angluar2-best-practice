import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';


import { RxListComponent } from './rx-list.component';

import { SmartSearchComponent } from './smart-search/smart-search.component';



const rxListRoutest: Routes = [
    {
        path: '', component: RxListComponent,
        children: [
             {path:'', pathMatch: 'full', redirectTo: 'smart-search'},
            { path: 'smart-search', component: SmartSearchComponent },
        ]
    }
];

export const RxListRoutintg:ModuleWithProviders = RouterModule.forChild(rxListRoutest);