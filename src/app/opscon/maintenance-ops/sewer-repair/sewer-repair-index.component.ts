import {
  OnInit,
  OnDestroy,
  Component
} from '@angular/core';
import { Http } from '@angular/http';

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
import { SewerCleaning } from './sewer-repair.model';

@Component({
  templateUrl: 'sewer-repair-index.component.html'
})
export class SewerRepairIndexComponent implements OnInit, OnDestroy {
  recentRecords: Array<SewerCleaning>;
  recentRecordsLayer: VectorLayer;

  ngOnInit() {
    this.getData().then(this.handleData.bind(this));
    this.mapService.resetView();
  }

  ngOnDestroy() {
    this.mapService.getMap().then(map => map.removeLayer(this.recentRecordsLayer));
  }

  constructor (
    public mapService: MapService,
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http
  ) { }

  handleData (data) {
    this.recentRecords = data.json();
    this.drawRecordsExtents();
  }

  drawRecordsExtents () {
    let features: Array<Feature> = [];

    this.recentRecords.forEach(r => {
      console.log(r.extent);
      if (r.extent && r.extent instanceof Array) {
        features.push(new Feature({
          geometry: Polygon.fromExtent(extent.buffer(r.extent, 50))
        }));
      }
    });
    let source = new VectorSource({ features: features });
    this.recentRecordsLayer = new VectorLayer({
      source: source,
      style: new Style({
        stroke: new StrokeStyle({
          color: 'orange',
          width: 4
        })
      })
    });

    this.mapService.getMap().then(map => map.addLayer(this.recentRecordsLayer));
  }

  private getData (): Promise<any> {
    return this.http.get(config.apiUrl + '/sewer-repairs.json')
           .toPromise();
  }
}
