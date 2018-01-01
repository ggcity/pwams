import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate
}  from '@angular/animations';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  template: `
    <section id='maint-ops' class='opscon card'>
      <header class='opscon-header card-header bg-primary text-white'>
        <h1>
          <a (click)="goBack()" class='close-button'>
            <i class='fa fa-chevron-left'></i>
          </a>
          &nbsp;
          {{ navService.currentTitle }}
        </h1>
      </header>

      <section>
        <router-outlet></router-outlet>
      </section>
    </section>
  `,
  styles: [`
    #maint-ops {
      height: 150%;
    }

    /deep/ .maint-ops-route {
      position: absolute;
    }
  `],
  animations: [
    trigger('routeAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate('150ms linear')
      ]),
      transition('* => void',
        animate('150ms linear', style({ transform: 'translateX(-100%)' }))
      )
    ])
  ]
})
export class MaintenanceOpsComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.opscon-host') opsconHost = true;

  ngOnInit () {
    // All of this just to change page title on route change... *sigh*
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    })
    .mergeMap((route) => route.data)
    .subscribe((event) => {
      this.navService.currentTitle = event['title'];
      this.navService.previousRoute = event['previous'];
    });
  }

  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public navService: NavigationService
  ) {
    navService.currentTitle = 'Maintenance Operations';
    navService.previousRoute = '/';
  }

  goBack() {
    this.router.navigate([this.navService.previousRoute]);
  }
}
