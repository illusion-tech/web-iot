import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IotClientService } from '../../service/iot-client.service';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'web-iot-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, OnDestroy {
  public temp = 0;
  public hum = 0;
  public hex = '#ffffff';
  public ledStatus = 0;
  public timer: any;

  constructor(
    private _iotClientService: IotClientService,
    private _utilService: UtilService,
  ) {}

  public colorChange($event: any) {
    this.hex = $event.target.value;
    this.switchLED(this.ledStatus);
  }

  public async switchLED(status: number) {
    this.ledStatus = status;
    await firstValueFrom(this._iotClientService.pubMessage({
      status,
      rgb: this._utilService.hex2Rgb(this.hex),
    }));
  }

  public async getTempAndHum() {
    const res = await firstValueFrom(this._iotClientService.getDeviceProperties());
    if (!res) return;
    this.temp = res.temperature;
    this.hum = res.Humidity;
  }

  ngOnInit() {
    this.getTempAndHum();
    this.timer = setInterval(() => {
      this.getTempAndHum();
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
