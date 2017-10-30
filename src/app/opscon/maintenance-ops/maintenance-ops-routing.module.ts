import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';

import { MaintenanceOpsComponent } from './maintenance-ops.component';
import { HomeComponent } from './home.component';

import { LaddaDirective } from '@zebracore/core';
import { RedlineComponent } from '@zebracore/redline-ops';
import {
  LineCleaningIndexComponent,
  NewLineCleaningComponent,
  LineCleaningReportsComponent
} from './line-cleaning';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: MaintenanceOpsComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'redline', component: RedlineComponent },

        { path: 'line-cleaning', component: LineCleaningIndexComponent },
        { path: 'line-cleaning/new', component: NewLineCleaningComponent },
        { path: 'line-cleaning/reports', component: LineCleaningReportsComponent }
      ]}
    ])
  ],
  declarations: [
    MaintenanceOpsComponent,
    HomeComponent,
    LaddaDirective,
    RedlineComponent,

    LineCleaningIndexComponent,
    NewLineCleaningComponent,
    LineCleaningReportsComponent
  ],
  exports: [
    RouterModule
  ]
})
export class MaintenanceOpsRoutingModule { }
