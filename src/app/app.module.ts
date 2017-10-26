import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { NgModule }      from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MapModule }     from './map/map.module';

import { AppComponent }     from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { LoggerService } from './shared/services/logger.service';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    MapModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [ 
    AppComponent,
    ToolbarComponent
  ],
  providers: [
    LoggerService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
