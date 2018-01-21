import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import config from '../../../app.config';
import { SelectService, LoggerService } from '../../../shared/services';
import { RootFoaming } from './root-foaming.model';
import { RootFoamingCommon } from './root-foaming-common';

@Component({
  templateUrl: 'new-root-foaming.component.html'
})
export class NewRootFoamingComponent extends RootFoamingCommon implements OnDestroy, OnInit {
  model: RootFoaming;
  @ViewChild('form') form: ElementRef;
  @ViewChild('submitBtn') submitBtn: ElementRef;

  selectedTotal = 0;
  selectedFeatures: ol.Collection<ol.Feature>;
  selector: ol.interaction.Select;
  countSubscription: Subscription;
  featuresSubscription: Subscription;

  ngOnInit () {
    // Set custom layer filter
    this.selectService.setLayerFilter(this.layerFilter);

    // Subscribe to features count
    this.countSubscription = this.selectService.selectCountObservable.subscribe(count => this.selectedTotal = count);
    this.featuresSubscription = this.selectService.selectionObservable.subscribe(features => this.selectedFeatures = features);

    // Zoom to extent of current selection
    this.selectService.zoomToSelection(true);
  }

  ngOnDestroy () {
    this.selectService.restoreLayerFilter();
    this.countSubscription.unsubscribe();
  }

  constructor (
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http,
    public router: Router
  ) {
    super(selectService, logger);
    this.model = new RootFoaming();
  }

  save (e) {
    this.submitBtn.nativeElement.disabled = true;
    let formData = new FormData(this.form.nativeElement);

    formData.append('line_foaming[extent]', JSON.stringify(this.selectService.getSelectedFeaturesExtent()));
    this.selectedFeatures.forEach(f => {
      let att = f.getProperties();
      formData.append('pipes[]', att.id);
    });

    this.http
      .post(config.apiUrl + '/line-foamings.json', formData).toPromise()
      .then(this.handleSaveResult.bind(this))
      .catch(this.handleSaveError.bind(this));
  }

  handleSaveResult (response) {
    this.router.navigateByUrl('/maintenance-ops')
  }

  handleSaveError (response) {
    this.submitBtn.nativeElement.disabled = false;
    let errors = response.json();

    if (errors instanceof Array) {
      alert('There was an error saving your record: ' + "\n\n" + errors.join("\n"));
    } else {
      alert('There was an unknown system error.');
    }
  }
}
