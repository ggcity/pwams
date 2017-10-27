import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  trigger,
  style,
  transition,
  animate
}  from '@angular/animations';

import { SelectService, LoggerService } from '../../../shared/services';

import { LineCleaning } from './line-cleaning.model';

import { Subscription } from 'rxjs/Subscription';

import { LaddaDirective } from '@zebracore/core';

@Component({
  templateUrl: 'line-cleaning.component.html',
  host: {
    '[@routeAnimation]': 'true',
    '[class.maint-ops-route]': 'true'
  },
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
export class LineCleaningComponent implements OnDestroy, OnInit {
  model: LineCleaning;
  selectedTotal: number = 0;
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
    private selectService: SelectService,
    private logger: LoggerService
  ) {
    this.model = new LineCleaning();
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
