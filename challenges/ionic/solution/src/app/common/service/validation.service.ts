import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  public isNullOrUndefined(value: any) {
    if (value == undefined || value == null) {
      return true;
    }
    return false;
  }

  public isEmptyString(value: string) {
    if (this.isNullOrUndefined(value) || value.trim().length < 1) {
      return true;
    }
    return false;
  }

  public validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
