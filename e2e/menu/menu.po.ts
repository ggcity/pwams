import { browser, element, by } from 'protractor';

import { BasePageObject } from '../base.po';

export class MenuPageObject extends BasePageObject {
  navigateToMenu () {
    return browser.get('/menu');
  }

  getDatasets () {
    return element.all(by.css('.opscon-host .datasets .nav-item')).getText();
  }

  clickMenu () {
    return element(by.id('menu-btn')).click();
  }
}
