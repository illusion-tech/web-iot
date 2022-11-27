import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IotClientService } from '../../service/iot-client.service';

@Component({
  selector: 'web-iot-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit, OnDestroy {
  public temp = 0;
  public hum = 0;
  public color = '#fff';
  public timer: any;

  constructor(private iotClientService: IotClientService) {}

  public colorChange($event: any) {
    this.color = $event.target.value;
  }

  public async getTempAndHum() {
    const res = await firstValueFrom(this.iotClientService.getDeviceProperties());
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
