import { Component } from '@angular/core';

import { MapService, LoggerService } from '../shared/services/';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: [ 'toolbar.component.css' ]
})

export class ToolbarComponent {
  constructor(private mapService: MapService, private logger: LoggerService) {
  }
}
