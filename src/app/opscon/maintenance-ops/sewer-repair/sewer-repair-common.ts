import { SelectService, LoggerService } from '../../../shared/services';
import { Subscription } from 'rxjs/Subscription';

export class SewerRepairCommon {
  constructor (
    public selectService: SelectService,
    public logger: LoggerService
  ) {
  }

  protected layerFilter (feature: ol.Feature, layer: ol.layer.Layer): boolean {
    let layerName;

    if (layer) {
      layerName = layer.get('machineName');
    } else if (feature.getId) {
      layerName = feature.getId().toString().split('.')[0];
    } else {
      return false;
    }

    return true;
  }
}
