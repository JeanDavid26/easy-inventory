import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  private loaderTimeout: any;
  private readonly LOADER_DELAY = 500; // ms

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.activeRequests++;

    if (this.activeRequests === 1) {
      this.loaderTimeout = setTimeout(() => {
        this.loaderService.show();
      }, this.LOADER_DELAY);
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          clearTimeout(this.loaderTimeout);
          this.loaderService.hide();
        }
      })
    );
  }
}

