import { browser, element, by } from 'protractor';

export class BasePageObject {
  navigateToBase () {
    return browser.get('/');
  }

  getOpsConTitle () {
    return element(by.css('.opscon-host h1')).getText();
  }

  closeOpsCon () {
    element(by.css('.opscon-host .close-button')).click();
  }

  /* ---- Mouse Actions ---- */

  clickAt(x, y) {
    browser.actions().mouseMove({x: x, y: y}).click().perform();
  }

  drag(from_x, from_y, to_x, to_y) {
    browser.actions()
      .mouseMove({ x: from_x, y: from_y })
      .mouseDown()
      .mouseMove({ x: to_x, y: to_y })
      .mouseUp();
  }
}
