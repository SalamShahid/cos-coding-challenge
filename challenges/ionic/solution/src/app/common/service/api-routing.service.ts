import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiRoutingService {
  constructor(private httpService: HttpService) {}

  authenticateBuyer(userId: string, password: string): Observable<any> {
    var data = JSON.parse('{ "password" : "' + password + '" }');
    var serviceName = 'v1/authentication/' + userId;
    return this.httpService.put(serviceName, data, new HttpParams(), false);
  }

  runningAuctionsByBuyer(filter: string, onlyCount: boolean): Observable<any> {
    var serviceName = 'v2/auction/buyer/';
    var parameters = new HttpParams()
      .append('filter', filter)
      .append('count', onlyCount);
    return this.httpService.get(serviceName, parameters, true);
  }
}
