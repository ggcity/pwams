import { Component } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate
}  from '@angular/animations';

import { MapService, LoggerService }    from '../../shared/services/';
import { MapConfig }     from '../../map/map-config';
//import { ToolsService } from '../../toolbar/tools/tools.service';

@Component({
  selector: 'opscon-menu',
  templateUrl: 'menu.component.html',
  styleUrls: [ 'menu.component.css' ],
  host: {
    '[@routeAnimation]': 'true',
    '[class.opscon-host]': 'true'
  },
  animations: [
    trigger('routeAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('150ms linear')
      ]),
      transition('* => void',
        animate('150ms linear', style({ transform: 'translateX(-100%)' }))
      )
    ])
  ]
})
export class MenuComponent {
  public availableDatasets: Array<string>;
  private currentDataset: string;

  constructor (
    private logger: LoggerService,
    private mapService: MapService
  ) {
    this.mapService.getMapConfig().then((def: MapConfig) => {
      this.availableDatasets = Object.keys(def.datasets);
      this.currentDataset    = def.defaultDataset;
    });
  }

  // FIXME: Maybe MapService dataset subject should also return string name of 
  // current dataset, so we can do away with this method.
  private setCurrentDataset (datasetName: string): void {
    this.mapService.setCurrentDataset(datasetName);
    this.currentDataset = datasetName;
  }
}
