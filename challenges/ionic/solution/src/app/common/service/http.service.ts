import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseURL = 'https://api-core-dev.caronsale.de/api/';
  constructor(private http: HttpClient, private storage: StorageService) {}

  //This function will perform any actions to be executed before get request to server.
  get(serviceName: string, parameters: HttpParams, withAuthorize: boolean) {
    var headers = new HttpHeaders();
    if (withAuthorize) {
      headers = headers
        .append('authtoken', this.storage.get('token'))
        .append('userid', this.storage.get('userId'));
    }
    const url = this.baseURL + serviceName;
    const options = { headers: headers, params: parameters };
    return this.http.get(url, options);
  }

  //This function will perform any actions to be executed before put request to server.
  put(
    serviceName: string,
    data: any,
    parameters: HttpParams,
    withAuthorize: boolean
  ) {
    var headers = new HttpHeaders();
    if (withAuthorize) {
      headers = headers
        .append('authtoken', this.storage.get('token'))
        .append('userid', this.storage.get('userId'));
    }
    console.log('headers: ', headers);
    const url = this.baseURL + serviceName;
    const options = { headers: headers, params: parameters };
    return this.http.put(url, data, options);
  }
}
