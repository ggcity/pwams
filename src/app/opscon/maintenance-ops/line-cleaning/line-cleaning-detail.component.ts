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

import { MapService, SelectService, LoggerService } from '../../../shared/services';
import { LineCleaning } from './line-cleaning.model';
import { LineCleaningCommon } from './line-cleaning-common';

@Component({
  templateUrl: 'line-cleaning-detail.component.html'
})
export class LineCleaningDetailComponent extends LineCleaningCommon implements OnInit, OnDestroy {
  model: LineCleaning;
  extentLayer: VectorLayer;

  ngOnInit() {
    this.model = new LineCleaning();

    let id = this.route.snapshot.paramMap.get('id');
    this.getLineCleaning(id).then(this.handleData.bind(this));
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

  private getLineCleaning (id): Promise<any> {
    return this.http.get('//ch.ci.garden-grove.ca.us/pwams-api/line-cleanings/' + id + '.json')
           .toPromise();
  }
}
