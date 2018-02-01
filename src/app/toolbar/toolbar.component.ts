import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap, tap
 } from 'rxjs/operators';

import { MapService, LoggerService } from '../shared/services/';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: [ 'toolbar.component.css' ]
})

export class ToolbarComponent implements OnInit {
  locations$: Observable<any>;
  private searchTerms = new Subject<string>();

  ngOnInit () {
    this.locations$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchAddress(term)),
    );
  }

  constructor(
    private mapService: MapService,
    private logger: LoggerService,
    private http: Http
  ) { }

  search (term: string) {
    this.searchTerms.next(term);
  }

  searchAddress(term: string): Observable<any> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get(`//www.ci.garden-grove.ca.us/maps/api/addresses/search?q=${term}`).pipe(
      tap(_ => console.log(`found matching "${term}"`, _))
    );
  }
}
