import { Component } from '@angular/core';
import { MaintenanceOpsService } from './maintenance-ops.service';
import { Operation } from './operation';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public availableOperations: Array<Operation>;

  constructor(private mos: MaintenanceOpsService) {
    mos.getAvailableOperations().then(ops => this.availableOperations = ops);
  }
}
