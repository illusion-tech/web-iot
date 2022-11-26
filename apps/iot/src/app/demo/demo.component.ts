import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IotClientService } from '../../service/iot-client.service';

@Component({
  selector: 'web-iot-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  public temp = 0;
  public hum = 0;

  constructor(private iotClientService: IotClientService) {}

  public async getTempAndHum() {
    const res = await firstValueFrom(this.iotClientService.getDeviceProperties());
    if (!res) return;
    this.temp = res.temperature;
    this.hum = res.Humidity;
  }

  ngOnInit() {
    setInterval(() => {
      this.getTempAndHum();
    }, 10000);
  }
}
