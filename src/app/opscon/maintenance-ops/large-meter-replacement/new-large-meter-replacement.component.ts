import {
  OnInit,
  OnDestroy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import config from '../../../app.config';
import { SelectService, LoggerService } from '../../../shared/services';
import { LargeMeterReplacement } from './large-meter-replacement.model';
import { LargeMeterReplacementCommon } from './large-meter-replacement-common';

@Component({
  templateUrl: 'new-large-meter-replacement.component.html'
})
export class NewLargeMeterReplacementComponent extends LargeMeterReplacementCommon implements OnInit, OnDestroy {
  model: LargeMeterReplacement;

  selectedTotal = 0;
  selectedFeatures: ol.Collection<ol.Feature>;
  selector: ol.interaction.Select;
  countSubscription: Subscription;
  featuresSubscription: Subscription;

  @ViewChild('form') form: ElementRef;
  @ViewChild('submitBtn') submitBtn: ElementRef;

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
    this.featuresSubscription.unsubscribe();
  }

  constructor (
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http,
    public router: Router
  ) {
    super(selectService, logger);
    this.model = new LargeMeterReplacement();
  }

  save (e) {
    this.submitBtn.nativeElement.disabled = true;
    let formData = new FormData(this.form.nativeElement);

    formData.append('large_meter_replacement[extent]', JSON.stringify(this.selectService.getSelectedFeaturesExtent()));
    this.selectedFeatures.forEach(f => {
      let att = f.getProperties();
      formData.append('features[]', att.id);
    });

    this.http
      .post(config.apiUrl + '/large-meter-replacements.json', formData).toPromise()
      .then(this.handleSaveResult.bind(this))
      .catch(this.handleSaveError.bind(this));
  }

  handleSaveResult (response) {
    this.router.navigateByUrl('/maintenance-ops')
  }

  handleSaveError (response) {
    this.submitBtn.nativeElement.disabled = false;
    let errors;

    try {
      errors = response.json();
    } catch (e) {}

    if (errors instanceof Array) {
      alert('There was an error saving your record: ' + "\n\n" + errors.join("\n"));
    } else {
      alert('There was an unknown system error.');
    }
  }
}
