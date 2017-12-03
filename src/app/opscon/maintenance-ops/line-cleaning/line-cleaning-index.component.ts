import {
  Component
} from '@angular/core';
import { Http } from '@angular/http';

import {
  trigger,
  style,
  transition,
  animate
}  from '@angular/animations';

import { SelectService, LoggerService } from '../../../shared/services';
import { LineCleaning } from './line-cleaning.model';
import { LineCleaningCommon } from './line-cleaning-common';

@Component({
  templateUrl: 'line-cleaning-index.component.html',
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
export class LineCleaningIndexComponent extends LineCleaningCommon {
  model: LineCleaning;
  lineCleanings: Array<LineCleaning>;

  constructor (
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http
  ) {
    super(selectService, logger);
    this.model = new LineCleaning();
    this.getLineCleanings().then(lcs => this.lineCleanings = lcs.json());
  }

  private getLineCleanings (): Promise<any> {
    return this.http.get('//ch.ci.garden-grove.ca.us/pwams-api/line-cleanings.json')
           .toPromise();
  }
}
