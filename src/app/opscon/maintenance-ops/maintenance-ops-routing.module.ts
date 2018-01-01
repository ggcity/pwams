import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MaintenanceOpsComponent } from './maintenance-ops.component';
import { HomeComponent } from './home.component';

import { LaddaDirective } from '@zebracore/core';
import { RedlineComponent } from '@zebracore/redline-ops';

import {
  LineCleaningIndexComponent,
  NewLineCleaningComponent,
  LineCleaningReportsComponent,
  LineCleaningDetailComponent
} from './line-cleaning';

import { NewSewerRepairComponent } from './sewer-repair';

import { NewRootCuttingComponent } from './root-cutting';

import { NewRootFoamingComponent } from './root-foaming';

import { NewPestTreatmentComponent } from './pest-treatment';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: MaintenanceOpsComponent, children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent, data: { title: 'Maintenance Operations', previous: '/' } },
          { path: 'redline', component: RedlineComponent },

          { path: 'line-cleaning', component: LineCleaningIndexComponent, data: { title: 'Line Cleaning', previous: '/maintenance-ops' } },
          {
            path: 'line-cleaning/new',
            component: NewLineCleaningComponent,
            data: { title: 'New Line Cleaning', previous: '/maintenance-ops/line-cleaning' }
          },
          { path: 'line-cleaning/reports', component: LineCleaningReportsComponent },
          {
            path: 'line-cleaning/:id',
            component: LineCleaningDetailComponent,
            data: { title: 'Line Cleaning', previous: '/maintenance-ops/line-cleaning' }
          },

          { path: 'sewer-repair', component: NewSewerRepairComponent },

          { path: 'root-cutting', component: NewRootCuttingComponent },

          { path: 'root-foaming', component: NewRootFoamingComponent },

          { path: 'pest-treatment', component: NewPestTreatmentComponent }
        ]
      }
    ])
  ],
  declarations: [
    MaintenanceOpsComponent,
    HomeComponent,
    LaddaDirective,
    RedlineComponent,

    LineCleaningIndexComponent,
    NewLineCleaningComponent,
    LineCleaningReportsComponent,
    LineCleaningDetailComponent,

    NewSewerRepairComponent,

    NewRootCuttingComponent,

    NewRootFoamingComponent,

    NewPestTreatmentComponent
  ],
  exports: [
    RouterModule
  ]
})
export class MaintenanceOpsRoutingModule { }
