import { Injectable } from  '@angular/core';

@Injectable()
export class NavigationService {
  private _currentTitle;
  private _previousRoute;

  constructor () {
    this._currentTitle = '';
    this._previousRoute = '..';
  }

  get currentTitle () {
    return this._currentTitle;
  }

  set currentTitle (title: string) {
    this._currentTitle = title;
  }

  get previousRoute () {
    return this._previousRoute;
  }

  set previousRoute (route: string) {
    this._previousRoute = route;
  }
}
