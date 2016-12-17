import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { DiceComponent } from './dice/dice.component';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { BoomComponent } from './boom/boom.component';

@NgModule({
    declarations: [
        AppComponent,
        DiceComponent,
        CardComponent,
        DashboardComponent,
        BoomComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        AppService,
        AppSettings
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
