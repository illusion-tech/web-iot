import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IotClientService {
  constructor (private _http: HttpClient) {}

  /**获取设备属性信息 */
  public getDeviceProperties() {
    const url = 'http://localhost:3333/api/getProperties';
    return this._http.get(url).pipe(
      map((res: any) => {
        if (res.success) return this.transformData(res);
      }),
    );
  }

  /**
   * 数据转换
   * @returns-{ [key: string]: any }
   */
  public transformData(res: any) {
    const propertyDataInfos: any[] = res.propertyDataInfos.propertyDataInfo;
    const data: any = {};
    propertyDataInfos.forEach((info) => {
      data[info.identifier] = info.list.propertyInfo[0].value;
    });
    return data;
  }

  /**向云平台发布消息 */
  public pubMessage(body?: any) {
    const url = 'http://localhost:3333/api/pubMessage';
    return this._http.post(url, body);
  }
}
