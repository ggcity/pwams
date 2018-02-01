import {
  OnInit,
  OnDestroy,
  Component
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http } from '@angular/http';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

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
import { SewerRepair } from './sewer-repair.model';
import { SewerRepairCommon } from './sewer-repair-common';

@Component({
  templateUrl: 'sewer-repair-detail.component.html'
})
export class SewerRepairDetailComponent extends SewerRepairCommon implements OnInit, OnDestroy {
  model: SewerRepair;
  extentLayer: VectorLayer;

  apiUrl = config.apiUrl;

  ngOnInit() {
    this.model = new SewerRepair();

    let id = this.route.snapshot.paramMap.get('id');
    this.getData(id).then(this.handleData.bind(this));
  }

  ngOnDestroy() {
    this.mapService.getMap().then(map => map.removeLayer(this.extentLayer));
  }

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    public mapService: MapService,
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http
  ) {
    super(selectService, logger);
  }

  handleData (response) {
    let lc = this.model = response.json();

    if (lc.extent && lc.extent instanceof Array) {
      // FIXME: idle computation wtf... needed to get this layer to work on the first run?
      Polygon.fromExtent(extent.buffer(lc.extent, 20));

      let feature = new Feature({
        geometry: Polygon.fromExtent(extent.buffer(lc.extent, 20))
      });

      let source = new VectorSource({ features: [feature] });

      this.extentLayer =  new VectorLayer({
        source: source,
        style: new Style({
          stroke: new StrokeStyle({
            color: 'red',
            width: 4
          })
        })
      });

      this.mapService.getMap().then(map => {
        map.addLayer(this.extentLayer);
        map.getView().fit(lc.extent, {
          size: map.getSize(),
          padding: [200, 200, 200,  400],
          duration: 800
        });
      });
    }
  }

  private getData (id): Promise<any> {
    return this.http.get(config.apiUrl + '/sewer-repairs/' + id + '.json')
           .toPromise();
  }
}
