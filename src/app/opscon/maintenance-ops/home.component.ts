import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MapService, LoggerService }    from '../../shared/services/';

import { MaintenanceOpsService } from './maintenance-ops.service';
import { Operation } from './operation';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  public availableOperations: Array<Operation>;

  constructor (
    private mos: MaintenanceOpsService,
    private logger: LoggerService,
    private mapService: MapService,
    private activatedRoute: ActivatedRoute
  ) {
    mos.getAvailableOperations().then(ops => this.availableOperations = ops);

    let urlDataset;

    this.activatedRoute.queryParams.subscribe(params => {
      urlDataset = params['dataset'];
    });

    if (urlDataset) {
      this.mapService.getMapConfig().then(() => {
        this.mapService.setCurrentDataset(urlDataset);
      });
    }
  }
}
