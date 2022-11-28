import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public hex2Rgb(hex: string) {
    return {
        red: parseInt("0x" + hex.slice(1, 3)),
        green: parseInt("0x" + hex.slice(3, 5)),
        blue: parseInt("0x" + hex.slice(5, 7)),
    };
  }
}
