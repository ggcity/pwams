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

import {
  SewerRepairIndexComponent,
  NewSewerRepairComponent
} from './sewer-repair';

import { NewRootCuttingComponent } from './root-cutting';

import { NewRootFoamingComponent } from './root-foaming';

import { NewPestTreatmentComponent } from './pest-treatment';

import { NewHotspotComponent } from './hotspot';

import {
  NewManholeInspectionComponent
} from './manhole-inspection';

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
          { path: 'redline', component: RedlineComponent, data: { title: 'New Redline', previous: '/maintenance-ops' } },

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

          { path: 'sewer-repair', component: SewerRepairIndexComponent, data: { title: 'Sewer Repair', previous: '/maintenance-ops' } },
          {
            path: 'sewer-repair/new',
            component: NewSewerRepairComponent,
            data: { title: 'New Sewer Repair', previous: '/maintenance-ops/sewer-repair' }
          },

          { path: 'root-cutting', component: NewRootCuttingComponent, data: { title: 'New Root Cutting', previous: '/maintenance-ops' } },

          { path: 'root-foaming', component: NewRootFoamingComponent, data: { title: 'New Line Foaming', previous: '/maintenance-ops' } },

          {
            path: 'pest-treatment',
            component: NewPestTreatmentComponent,
            data: { title: 'New Pest Treatment', previous: '/maintenance-ops' }
          },

          {
            path: 'manhole-inspection',
            component: NewManholeInspectionComponent,
            data: { title: 'New Manhole Inspection', previous: '/maintenance-ops/manhole-inspection'}
          },

          { path: 'hot-spot', component: NewHotspotComponent, data: { title: 'New Hot Spot', previous: '/maintenance-ops'} }
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

    SewerRepairIndexComponent,
    NewSewerRepairComponent,

    NewRootCuttingComponent,

    NewRootFoamingComponent,

    NewPestTreatmentComponent,

    NewManholeInspectionComponent,

    NewHotspotComponent
  ],
  exports: [
    RouterModule
  ]
})
export class MaintenanceOpsRoutingModule { }
