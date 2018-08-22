import {
  OnInit,
  Component
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MapService, LoggerService } from './shared/services/';

@Component({
  selector: 'app-home',
  template: ''
})

export class HomeComponent implements OnInit {
  ngOnInit() {
    let urlDataset;

    this.activatedRoute.queryParams.subscribe(params => {
      urlDataset = params['dataset'];
    });

    if (urlDataset) {
      this.mapService.getMapConfig().then(() => {
        this.mapService.setCurrentDataset(urlDataset);
      });
    }
  }

  constructor(
    private logger: LoggerService,
    private mapService: MapService,
    private activatedRoute: ActivatedRoute
  ) { }
}
