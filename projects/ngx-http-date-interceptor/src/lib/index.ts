import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

class DateHttpInterceptor implements HttpInterceptor {
  iso8601 =
    /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (
          event instanceof HttpResponse &&
          event.body &&
          event?.headers?.get('content-type')?.includes('application/json')
        ) {
          this.convertToDate(event.body);
        }
      })
    );
  }

  private convertToDate(body: any) {
    if (!!body && typeof body === 'object') {
      for (const key of Object.keys(body)) {
        const value = body[key];
        if (this.iso8601.test(value)) {
          body[key] = new Date(value);
        } else {
          this.convertToDate(value);
        }
      }
    }
  }
}

export const HttpDateInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DateHttpInterceptor,
  multi: true,
};
