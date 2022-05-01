import { HijriyahDate, HijriyahDateConstructor } from "./types";
import { toHijriyah } from "./utils";

class HijriyahEvent implements HijriyahDate {
  private static readonly msPerSecond: number = 1000;
  private static readonly msPerMinutes: number = HijriyahEvent.msPerSecond * 60;
  private static readonly msPerHours: number = HijriyahEvent.msPerMinutes * 60;
  private static readonly msPerDays: number = HijriyahEvent.msPerHours * 24;

  private _default: Date = new Date();
  private _gYear: number = this._default.getFullYear();
  private _gMonth: number = this._default.getMonth();
  private _gDate: number = this._default.getDate();
  private _hijr = toHijriyah(this._gYear, this._gMonth, this._gDate);

  constructor();
  constructor(args: number | string);
  constructor(...args: number[]) {
    if (arguments.length === 1) {
      switch (typeof (args)) {
        case "number":
          break;
        case "string":
          break;
        default:
          break;
      }
    }
    else if (arguments.length === 2) {
      
    }
    else {
      
    }
  }

  
  getFullYear = () => this._hijr.hy;
  getMonth = () => this._hijr.hm;
  getDate = () => this._hijr.hd;
}

export const Hijriyah: HijriyahDateConstructor = (() => {
  return HijriyahEvent;
})();