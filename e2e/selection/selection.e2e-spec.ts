import { browser, element, by } from 'protractor';
import { SelectionPageObject } from './selection.po';

describe('Selection', function() {
  let page: SelectionPageObject;
  let x: number, y: number;

  beforeEach(() => {
    page = new SelectionPageObject();
    page.navigateToBase();
  });

  it('should single click and selects a point', (done) => {
    browser.wait(() => {
    browser.executeScript(function () {
      var map = new ol.Map({
        target: 'map',
        view: new ol.View({
          center: [0, 0],
          zoom: 25,
          projection: 'EPSG:3857'
        })
      });

      return map;
      // return map.getPixelFromCoordinate([1, 1]);
    }).then((coords) => {
      console.log(coords);
      [x, y] = coords;
      page.clickAt(x, y);
    });
done();
    }, 1000);
  });
});
