import { Injectable } from '@nestjs/common';
import * as $Iot from '@alicloud/iot20180120';
import * as $tea from '@alicloud/tea-typescript';
import Util from '@alicloud/tea-util';
import { v4 } from 'uuid';
import { IotClient } from './client/iot-client';

@Injectable()
export class AppService {
  constructor(private _iotClient: IotClient) {}

  /**查询设备属性值 */
  async getDeviceProperties(productKey: string, deviceName: string, keys: string[]) {
    // 获取最新的一条数据
    const request = new $Iot.QueryDevicePropertiesDataRequest({
      deviceName,
      productKey,
      iotInstanceId: this._iotClient.iotInstanceId,
      identifier: keys,
      asc: 1,
      pageSize: 1,
      startTime: new Date().getTime() - 5000,
      endTime: new Date().getTime(),
    });
    try {
      console.log('-----------批量查询指定设备的多个属性的历史数据：QueryDevicePropertiesData----------');
      console.log('Resuest: ', Util.toJSONString($tea.toMap(request)));
      const response = await this._iotClient.client.queryDevicePropertiesData(request);
      console.log('Response: ', Util.toJSONString($tea.toMap(response.body)));
      return response.body;
    } catch (error) {
      console.log(error.message);
      return new $Iot.QueryDevicePropertiesDataResponseBody({
        success: false,
      });
    }
  }

  /**发布消息 */
  async publishMessage(productKey: string, deviceName: string, params: any, topic: string) {
    const message = {
      method: "post",
      id: v4(),
      params,
      version: "1.0.0",
    };
    const request = new $Iot.PubRequest({
      deviceName,
      productKey,
      iotInstanceId: this._iotClient.iotInstanceId,
      messageContent: Util.toBytes(JSON.stringify(message)).toString('base64'), // String => Buffer => Base64
      topicFullName: topic,
    });
    try {
      console.log('-----------向云平台发送消息：Pub----------');
      console.log('Resuest: ', Util.toJSONString($tea.toMap(request)));
      const response = await this._iotClient.client.pub(request);
      console.log('Response: ', Util.toJSONString($tea.toMap(response.body)));
      return response.body;
    } catch (error) {
      console.log(error.message);
      return new $Iot.PubResponseBody({
        success: false,
      });
    }
  }
}
