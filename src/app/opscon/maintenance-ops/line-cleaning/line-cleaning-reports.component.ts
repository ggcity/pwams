import {
  Component
} from '@angular/core';

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
  templateUrl: 'line-cleaning-reports.component.html',
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
export class LineCleaningReportsComponent extends LineCleaningCommon {
  model: LineCleaning;
  lineCleanings: Array<LineCleaning>;

  constructor (
    public selectService: SelectService,
    public logger: LoggerService
  ) {
    super(selectService, logger);
    this.model = new LineCleaning();
  }
}
