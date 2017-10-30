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

export class LineCleaningCommon implements OnDestroy, OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.maint-ops-route') maintOpsRoute = true;

  selectedTotal = 0;
  selector: ol.interaction.Select;
  countSubscription: Subscription;

  ngOnInit () {
    // Set custom layer filter
    this.selectService.setLayerFilter(this.layerFilter);

    // Subscribe to features count
    this.countSubscription = this.selectService.selectCountObservable.subscribe(count => this.selectedTotal = count);

    // Zoom to extent of current selection
    this.selectService.zoomToSelection(true);
  }

  ngOnDestroy () {
    this.selectService.restoreLayerFilter();
    this.countSubscription.unsubscribe();
  }

  constructor (
    public selectService: SelectService,
    public logger: LoggerService
  ) {
  }

  private layerFilter (feature: ol.Feature, layer: ol.layer.Layer): boolean {
    let layerName;

    if (layer) {
      layerName = layer.get('machineName');
    } else if (feature.getId) {
      layerName = feature.getId().toString().split('.')[0];
    } else {
      return false;
    }

    return /ssgravitymain$/.test(layerName);
  }
}
