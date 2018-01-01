import {
  OnInit,
  OnDestroy,
  HostBinding
} from '@angular/core';

import {
  trigger,
  style,
  transition,
  animate
}  from '@angular/animations';

import { SelectService, LoggerService } from '../../../shared/services';
import { Subscription } from 'rxjs/Subscription';

export class LineCleaningCommon {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.maint-ops-route') maintOpsRoute = true;

  constructor (
    public selectService: SelectService,
    public logger: LoggerService
  ) {
  }

  protected layerFilter (feature: ol.Feature, layer: ol.layer.Layer): boolean {
    let layerName;

    if (layer) {
      layerName = layer.get('machineName');
    } else if (feature.getId) {
      layerName = feature.getId().toString().split('.')[0];
    } else {
      return false;
    }

    return /gravity_mains$/.test(layerName);
  }
}
