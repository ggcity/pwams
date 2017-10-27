import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
}  from '@angular/animations';

import { MaintenanceOpsService } from './maintenance-ops.service';
import { Operation } from './operation';

@Component({
  templateUrl: 'home.component.html',
  host: {
    '[@routeAnimation]': 'true',
    '[class.maint-ops-route]': 'true'
  },
  animations: [
    trigger('routeAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('150ms linear')
      ]),
      transition('* => void',
        animate('150ms linear', style({ transform: 'translateX(-100%)' }))
      )
    ])
  ]
})
export class HomeComponent {
  public availableOperations: Array<Operation>;

  constructor (
    private mos: MaintenanceOpsService
  ) {
    mos.getAvailableOperations().then(ops => this.availableOperations = ops);
  }
}
