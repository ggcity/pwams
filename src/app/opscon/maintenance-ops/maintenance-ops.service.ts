import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Subscription } from 'rxjs/Subscription';

import { MapService, LoggerService } from '../../shared/services';

import { Operation } from './operation';

@Injectable()
export class MaintenanceOpsService {
  currentDatasetName: string;
  datasetSubscription: Subscription;

  constructor (
    private http: Http,
    private mapService: MapService,
    private logger: LoggerService
  ) {
    this.datasetSubscription = this.mapService.datasetObservable.subscribe(d =>
      this.currentDatasetName = this.mapService.getCurrentDatasetName()
    );
  }

  getAvailableOperations (): Promise<Array<Operation>> {
    let operations = {
      sewer: [
        { name: 'Manhole Inspection', machineName: 'manhole-inspection', description: 'Inspect manholes for proper conditions and vermin' },
        { name: 'Hot Spot Cleaning', machineName: 'hot-spot', description: 'Update hot spots cleaning record'},
        // { name: 'CCTV', machineName: 'cctv', description: 'View and inspect CCTV videos' },
        { name: 'Line Cleaning', machineName: 'line-cleaning', description: 'Report line cleaning operation' },
        { name: 'Sewer Repair', machineName: 'sewer-repair', description: 'Record repair activity'},
        { name: 'Root Cutting', machineName: 'root-cutting', description: 'Record root cutting activity' },
        { name: 'Line Foaming', machineName: 'root-foaming', description: 'Record line foaming activity' },
        { name: 'Pest Treatment', machineName: 'pest-treatment', description: 'Record pest treatment activity' },
        { name: 'Redline', machineName: 'redline', description: 'Markup map for corrections' }
        // { name: 'Spills', machineName: 'spills', description: 'Report chemical spills and actions taken' }
      ],

      water: [
        { name: 'Redline', machineName: 'redline', description: 'Markup map for corrections' }
      ],

      storm_water: [
        { name: 'Redline', machineName: 'redline', description: 'Markup map for corrections' }
      ]
    };

    return Promise.resolve(operations[this.currentDatasetName || 'sewer']);
  }
}
