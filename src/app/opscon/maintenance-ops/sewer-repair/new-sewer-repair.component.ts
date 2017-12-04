import {
  Component
} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import {
  trigger,
  style,
  transition,
  animate
}  from '@angular/animations';

import { SelectService, LoggerService } from '../../../shared/services';
import { SewerCleaning } from './sewer-repair.model';
import { SewerRepairCommon } from './sewer-repair-common';

@Component({
  templateUrl: 'new-sewer-repair.component.html',
  animations: [
    trigger('routeAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate('150ms linear')
      ]),
      transition('* => void',
        animate('150ms linear', style({ transform: 'translateX(100%)' }))
      )
    ])
  ]
})
export class NewSewerRepairComponent extends SewerRepairCommon {
  model: SewerCleaning;

  constructor (
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http,
    public router: Router
  ) {
    super(selectService, logger);
    this.model = new SewerCleaning();
  }

  saveSewerRepair (e) {
    e.target.disabled = true;

    this.selectedFeatures.forEach(f => {
      let att = f.getProperties();
      this.model.pipes.push(att.facilityid);
    });

    this.http.post('//ch.ci.garden-grove.ca.us/pwams-api/sewer-repairs', this.model).subscribe(
      r => this.router.navigateByUrl('/maintenance-ops/home')
    );
  }
}
