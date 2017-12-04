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
import { PestTreatment } from './pest-treatment.model';
import { PestTreatmentCommon } from './pest-treatment-common';

@Component({
  templateUrl: 'new-pest-treatment.component.html',
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
export class NewPestTreatmentComponent extends PestTreatmentCommon {
  model: PestTreatment;

  constructor (
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http,
    public router: Router
  ) {
    super(selectService, logger);
    this.model = new PestTreatment();
  }

  save (e) {
    e.target.disabled = true;

    this.selectedFeatures.forEach(f => {
      let att = f.getProperties();
      this.model.manholes.push(att.facilityid);
    });

    this.http.post('//ch.ci.garden-grove.ca.us/pwams-api/pest-treatments', this.model).subscribe(
      r => this.router.navigateByUrl('/maintenance-ops/home')
    );
  }
}
