import {
  OnInit,
  OnDestroy,
  Component
} from '@angular/core';
import { Http } from '@angular/http';

import {
  trigger,
  style,
  transition,
  animate
}  from '@angular/animations';

import Feature from 'ol/feature';
import Polygon from 'ol/geom/polygon';
import VectorSource from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';
import Style from 'ol/style/style';
import FillStyle from 'ol/style/fill';
import StrokeStyle from 'ol/style/stroke';
import extent from 'ol/extent';

import config from '../../../app.config';
import { MapService, SelectService, LoggerService } from '../../../shared/services';
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
export class LineCleaningIndexComponent extends LineCleaningCommon implements OnInit, OnDestroy {
  model: LineCleaning;
  recentCleaningsLayer: VectorLayer;
  lineCleanings: Array<LineCleaning>;

  ngOnInit() {
    this.getLineCleanings().then(this.handleRecentCleanings.bind(this));
    this.mapService.resetView();
  }

  ngOnDestroy() {
    this.mapService.getMap().then(map => map.removeLayer(this.recentCleaningsLayer));
  }

  constructor (
    public mapService: MapService,
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http
  ) {
    super(selectService, logger);
    this.model = new LineCleaning();
  }

  handleRecentCleanings (lcs) {
    this.lineCleanings = lcs.json();
    this.drawRecentCleaningExtents();
  }

  drawRecentCleaningExtents () {
    let features: Array<Feature> = [];

    this.lineCleanings.forEach(lc => {
      if (lc.extent && lc.extent instanceof Array) {
        features.push(new Feature({
          geometry: Polygon.fromExtent(extent.buffer(lc.extent, 20))
        }));
      }
    });
    let source = new VectorSource({ features: features });
    this.recentCleaningsLayer = new VectorLayer({
      source: source,
      style: new Style({
        stroke: new StrokeStyle({
          color: 'orange',
          width: 4
        })
      })
    });

    this.mapService.getMap().then(map => map.addLayer(this.recentCleaningsLayer));
  }

  private getLineCleanings (): Promise<any> {
    return this.http.get(config.apiUrl + '/line-cleanings.json')
           .toPromise();
  }
}
