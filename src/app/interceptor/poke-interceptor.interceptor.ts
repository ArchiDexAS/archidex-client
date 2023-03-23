import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { camelCase, mapKeys, mapValues } from 'lodash';

@Injectable()
export class PokeInterceptorInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const startTime = (new Date()).getTime();
      return next.handle(request).pipe(map(event => {
        if (event instanceof HttpResponse) {
          let camelCaseObject = mapKeys(event.body, (v, k) =>  camelCase(k));
          const modEvent = event.clone({ body: camelCaseObject });
          if(modEvent.body!['attackData']){
            const attackd = mapValues(modEvent.body!['attackData'], (v, k) => {
              const aks = mapKeys(v, (vv, kk) => camelCase(kk) )
              return aks
            });
            modEvent.body!['attackData'] = Object.values(attackd);
            const defenderId = mapValues(camelCaseObject['defenseData'], (v, k) => {
              const aks = mapKeys(v, (vv, kk) => camelCase(kk) )
              return aks
            });
            modEvent.body!['defenseData'] = Object.values(defenderId);
          }
          
          //console.log(modEvent)
          return modEvent;
        }
        return event;
    }));
  }
}
