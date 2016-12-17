import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DiceComponent } from './dice/dice.component';
import { CardComponent } from './card/card.component';
import { BoomComponent } from './boom/boom.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dice', component: DiceComponent },
    { path: 'card', component: CardComponent },
    { path: 'boom', component: BoomComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
