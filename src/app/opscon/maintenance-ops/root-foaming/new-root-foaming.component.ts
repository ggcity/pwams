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
import { RootFoaming } from './root-foaming.model';
import { RootFoamingCommon } from './root-foaming-common';

@Component({
  templateUrl: 'new-root-foaming.component.html',
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
export class NewRootFoamingComponent extends RootFoamingCommon {
  model: RootFoaming;

  constructor (
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http,
    public router: Router
  ) {
    super(selectService, logger);
    this.model = new RootFoaming();
  }

  save (e) {
    e.target.disabled = true;

    this.selectedFeatures.forEach(f => {
      let att = f.getProperties();
      this.model.pipes.push(att.facilityid);
    });

    this.http.post('//ch.ci.garden-grove.ca.us/pwams-api/root-foamings', this.model).subscribe(
      r => this.router.navigateByUrl('/maintenance-ops/home')
    );
  }
}
