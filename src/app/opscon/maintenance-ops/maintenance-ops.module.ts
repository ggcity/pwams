import { NgModule }    from '@angular/core';

import { MaintenanceOpsRoutingModule } from './maintenance-ops-routing.module';
import { MaintenanceOpsService}        from './maintenance-ops.service';

@NgModule({
  imports: [
    MaintenanceOpsRoutingModule
  ],
  providers: [
    MaintenanceOpsService
  ]
})
export class MaintenanceOpsModule { }
