import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'zebracore',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    'app.component.css'
  ],
  template: `
    <app-toolbar></app-toolbar>
    <app-map></app-map>
    <router-outlet></router-outlet>
  `
})

export class AppComponent { }
