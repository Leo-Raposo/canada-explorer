import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TouristSpotsListComponent } from '../components/tourist-spots-list/tourist-spots-list.component';
import { TouristSpotDetailComponent } from '../components/tourist-spot-detail/tourist-spot-detail.component';
import { TouristSpotFormComponent } from '../components/tourist-spot-form/tourist-spot-form.component';

const routes: Routes = [
  { path: '', component: TouristSpotsListComponent },
  { path: 'create', component: TouristSpotFormComponent },
  { path: 'edit/:id', component: TouristSpotFormComponent },
  { path: 'detail/:id', component: TouristSpotDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TouristSpotsRoutingModule { }
