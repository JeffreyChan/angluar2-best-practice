import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

const lazyListRoutes: Routes = [
    {
        path: 'form-list',
        loadChildren: '../form-list/form-list.module#FormListModule'
    },
    {
        path: 'rx-list',
        loadChildren: '../rx-list/rx-list.module#RxListModule'
    },
];

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    ...lazyListRoutes,
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(appRoutes);