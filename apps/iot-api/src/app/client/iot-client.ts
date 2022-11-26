import { Injectable } from '@nestjs/common';
import Iot from '@alicloud/iot20180120';
import * as $OpenApi from '@alicloud/openapi-client';

@Injectable()
export class IotClient {
  #client: Iot;

  // TODO 配置到环境变量
  #accessKeyId = 'LTAI5tP3kZSDE8tM75bE5e2b';
  #accessKeySecret = 'izBbFZGUMiSMDX1uiSDFrMJSQ0K38v';
  #iotInstanceId = 'iot-06z00b3bhjx2czd';

  get iotInstanceId(): string {
    return this.#iotInstanceId;
  }

  get client(): Iot {
    return this.#client || this.initClient();
  }

  public initClient(): Iot {
    const config = new $OpenApi.Config({
      accessKeyId: this.#accessKeyId,
      accessKeySecret: this.#accessKeySecret,
      regionId: 'cn-shanghai',
    });
    this.#client = new Iot(config);
    return this.#client;
  }
}
