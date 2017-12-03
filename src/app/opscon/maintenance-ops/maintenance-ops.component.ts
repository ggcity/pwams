import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
}  from '@angular/animations';

@Component({
  template: `
    <section id='maint-ops' class='opscon card'>
      <header class='opscon-header card-header bg-primary text-white'>
        <h1>
          Maintenance Operations
          <a routerLink='/' class='close-button'>
            <i class='fa fa-close'></i>
          </a>
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
  host: {
    '[@routeAnimation]': 'true',
    '[class.opscon-host]': 'true'
  },
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
export class MaintenanceOpsComponent { }
