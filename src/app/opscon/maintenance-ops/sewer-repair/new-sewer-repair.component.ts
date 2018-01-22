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
import { SewerRepairCommon } from './sewer-repair-common';

@Component({
  templateUrl: 'new-sewer-repair.component.html'
})
export class NewSewerRepairComponent extends SewerRepairCommon implements OnDestroy, OnInit {
  @ViewChild('sewerRepairForm') form: ElementRef;
  @ViewChild('submitBtn') submitBtn: ElementRef;

  selectedTotal = 0;
  selectedFeatures: ol.Collection<ol.Feature>;
  selector: ol.interaction.Select;
  countSubscription: Subscription;
  featuresSubscription: Subscription;
  savable = false;

  ngOnInit() {
    // Set custom layer filter
    this.selectService.setLayerFilter(this.layerFilter);

    // Subscribe to features count
    this.countSubscription = this.selectService.selectCountObservable.subscribe(count => this.selectedTotal = count);
    this.featuresSubscription = this.selectService.selectionObservable.subscribe(this.featuresSelected.bind(this));

    // Zoom to extent of current selection
    this.selectService.zoomToSelection(true);
  }

  ngOnDestroy() {
    this.selectService.restoreLayerFilter();
    this.countSubscription.unsubscribe();
  }

  constructor(
    public selectService: SelectService,
    public logger: LoggerService,
    public http: Http,
    public router: Router
  ) {
    super(selectService, logger);
  }

  featuresSelected(features) {
    this.savable = false;
    this.selectedFeatures = features;

    if (features && features.getLength() > 1) {
      // Do check that one is pipe and one is manhole
      try {
        let ids = features.getArray().map(f => f.getId().split('.')[0]);
        this.savable = ids.length === 2 && ids.includes('gravity_mains') && ids.includes('manholes');
      } catch (e) {
        this.savable = false;
      }
    }
  }

  save(e) {
    if (!this.savable) {
      alert('You must select exactly one pipe and one manhole to save this form.');
      return;
    }

    this.submitBtn.nativeElement.disabled = true;

    let formData = new FormData(this.form.nativeElement);

    formData.append('sewer_repair[extent]', JSON.stringify(this.selectService.getSelectedFeaturesExtent()));
    this.selectedFeatures.forEach(f => {
      let att = f.getProperties();
      let [type, id] = f.getId().split('.');
      if (type === 'gravity_mains') formData.append('sewer_repair[pipe_id]', att.id);
      else if (type === 'manholes') formData.append('sewer_repair[manhole_id]', att.id);
    });

    this.http
      .post(config.apiUrl + '/sewer-repairs.json', formData).toPromise()
      .then(this.handleSaveResult.bind(this))
      .catch(this.handleSaveError.bind(this));
  }

  handleSaveResult(response) {
    this.router.navigateByUrl('/maintenance-ops/sewer-repair')
  }

  handleSaveError(response) {
    this.submitBtn.nativeElement.disabled = false;
    let errors = response.json();

    if (errors instanceof Array) {
      alert('There was an error saving your record: ' + "\n\n" + errors.join("\n"));
    } else {
      alert('There was an unknown system error.');
    }
  }
}
