import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TouristSpotFormComponent } from './components/tourist-spot-form/tourist-spot-form.component';
import { HomeComponent } from './components/home/home.component';
import { TouristSpotsListComponent } from './components/tourist-spots-list/tourist-spots-list.component';
import { TouristSpotsAddComponent } from './components/tourist-spots-add/tourist-spots-add.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', component: TouristSpotFormComponent },
    { path: 'login', component: TouristSpotFormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'local-list', component: TouristSpotsListComponent },
    { path: 'tourist-spots-add', component: TouristSpotsAddComponent },

    { path: '**', redirectTo: 'login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
