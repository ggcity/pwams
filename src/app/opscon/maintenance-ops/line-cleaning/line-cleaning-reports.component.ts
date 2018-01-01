import {
  OnInit,
  OnDestroy,
  Component
} from '@angular/core';

import Heatmap from 'ol/layer/heatmap';
import VectorSource from 'ol/source/vector';

import { MapService, SelectService, LoggerService } from '../../../shared/services';
import { LineCleaning } from './line-cleaning.model';
import { LineCleaningCommon } from './line-cleaning-common';

@Component({
  templateUrl: 'line-cleaning-reports.component.html'
})
export class LineCleaningReportsComponent extends LineCleaningCommon implements OnInit, OnDestroy {
  model: LineCleaning;
  lineCleanings: Array<LineCleaning>;

  ngOnInit () {
    this.mapService.resetView();
  }

  ngOnDestroy () { }

  constructor (
    public mapService: MapService,
    public selectService: SelectService,
    public logger: LoggerService
  ) {
    super(selectService, logger);
    this.model = new LineCleaning();
  }
}
