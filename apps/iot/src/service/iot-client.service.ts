import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IotClientService {
  constructor (private _http: HttpClient) {}

  public getDeviceProperties() {
    const url = 'http://localhost:3333/api/getProperties';
    return this._http.get(url).pipe(
      map((res: any) => {
        if (res.success) return this.transformData(res);
      }),
    );
  }

  public transformData(res: any) {
    const propertyDataInfos: any[] = res.propertyDataInfos.propertyDataInfo;
    const data: any = {};
    propertyDataInfos.forEach((info) => {
      data[info.identifier] = info.list.propertyInfo[0].value;
    });
    return data;
  }
}
