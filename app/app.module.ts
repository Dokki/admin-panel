import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, appRoutingProviders} from './app.routing'
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import {AppComponent}  from './components/app/app.component';
import {LoginComponent} from './components/login/login.component';
import {EventComponent} from './components/event/event.component';
import {SpeakerComponent} from "./components/speaker/speaker.component";

import {AuthService} from './services/auth.service';
import {GetRecordsService} from './services/get-records.servise';
import {AuthGuard} from './auth.guard';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        EventComponent,
        SpeakerComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        appRoutingProviders,
        AuthService,
        GetRecordsService,
        AuthGuard,
        LoginComponent,
        EventComponent,
        SpeakerComponent
    ]
})
export class AppModule { }

