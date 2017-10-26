import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';

import { HomeComponent } from './home.component';
import { MenuComponent } from './opscon/menu/menu.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'maintenance-ops', loadChildren: './opscon/maintenance-ops/maintenance-ops.module#MaintenanceOpsModule' }
    ])
  ],
  declarations: [
    HomeComponent,
    MenuComponent
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
