import { Injectable } from  '@angular/core';

declare var console: any;

@Injectable()

export class LoggerService {
  error (...args: any[]) : void {
    console && console.error(...args);
  }

  log (...args: any[]) : void {
    console && console.log(...args);
  }

  debug (...args: any[]) : void {
    console && console.debug(...args);
  }
}
