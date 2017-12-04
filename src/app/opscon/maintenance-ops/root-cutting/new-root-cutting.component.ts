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
import { RootCutting } from './root-cutting.model';
import { RootCuttingCommon } from './root-cutting-common';

@Component({
  templateUrl: 'new-root-cutting.component.html',
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
export class NewRootCuttingComponent extends RootCuttingCommon {
  model: RootCutting;

  constructor (
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http,
    public router: Router
  ) {
    super(selectService, logger);
    this.model = new RootCutting();
  }

  save (e) {
    e.target.disabled = true;

    this.selectedFeatures.forEach(f => {
      let att = f.getProperties();
      this.model.pipes.push(att.facilityid);
    });

    this.http.post('//ch.ci.garden-grove.ca.us/pwams-api/root-cuttings', this.model).subscribe(
      r => this.router.navigateByUrl('/maintenance-ops/home')
    );
  }
}
