import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SaleService } from '../../../../core/services/sale.service';
import { SaleSession } from '../../../../@models/entities/SaleSession.interface';

@Injectable({ providedIn: 'root' })
export class SaleSessionDetailResolver implements Resolve<any> {
  constructor(private _saleService: SaleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<SaleSession> {
    const sessionId = route.paramMap.get('id');
    console.log('there')
    return this._saleService.getSaleSession(Number(sessionId));
  }
}
