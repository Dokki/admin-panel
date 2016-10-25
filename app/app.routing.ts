import {ModuleWithProviders}  from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {LoginComponent} from "./components/login/login.component";
import {EventComponent} from "./components/event/event.component";
import {SpeakerComponent} from "./components/speaker/speaker.component";

import {AuthGuard} from "./auth.guard";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const appRootes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'event',
        component: EventComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'speaker',
        component: SpeakerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRootes);