import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { LoggerService } from '../../shared/services/logger.service';

import { Operation } from './operation';

@Injectable()
export class MaintenanceOpsService {
  constructor (
    private http: Http,
    private logger: LoggerService
  ) {
  }

  getAvailableOperations (): Promise<Array<Operation>> {
    return Promise.resolve([
      { name: 'Redline', machineName: 'redline', description: 'Markup map for edits' },
      { name: 'Hot Spot Cleaning', machineName: 'hot-spot-cleaning', description: 'Update hot spots cleaning record'},
      { name: 'Line Cleaning', machineName: 'line-cleaning', description: 'Report line cleaning operation' },
      { name: 'CCTV', machineName: 'cctv', description: 'View and inspect CCTV videos' },
      { name: 'Manhole Inspection', machineName: 'manhole-inspection', description: 'Inspect manholes for proper conditions and vermin' },
      { name: 'Spills', machineName: 'spills', description: 'Report chemical spills and actions taken' }
    ]);
  }
}
