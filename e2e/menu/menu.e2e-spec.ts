import { browser, element, by } from 'protractor';
import { MenuPageObject } from './menu.po';

describe('Menu', function() {
  let page: MenuPageObject;

  beforeEach(() => {
    page = new MenuPageObject();
    page.navigateToMenu();
  });

  it('should show menu', () => {
    expect(page.getOpsConTitle()).toEqual('Menu');
  });

  it('should list the right datasets', () => {
    page.getDatasets().then(datasets => {
      expect(datasets).toEqual(['Test-Dataset-1 Active']);
    });
  });

  it('should close menu', () => {
    page.closeOpsCon();
    browser.sleep(200);
    expect(element.all(by.css('.opscon-host'))).toEqual([]);
  });
});
