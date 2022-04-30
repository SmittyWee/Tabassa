import { ConfigList } from "./config";
import { ConfigDataSchema, GregorianDateSchema, HijrDateSchema, JavaDateSchema } from "./types";

function intPart(floatNum: number) {
  if (floatNum < -0.0000001) {
    return Math.ceil(floatNum - 0.0000001);
  }

  return Math.floor(floatNum + 0.0000001);
}

export class IslamicDate {
  config   : ConfigDataSchema;

  constructor(
    args?: {
      config?: keyof typeof ConfigList | ConfigDataSchema
    }
  ) {
    this.config = args?.config ? typeof args.config === "string" ? ConfigList[args.config] : args.config : ConfigList["id-ID"];
  }

  /**
   * Gregorian to Hijr
   * @param Y Gregorian Year
   * @param M Gregorian Month [1 - 12]
   * @param D Gregorian Date
   * @param delta <Delta = 1> isna rulling
   */
  gregorianToHijr(
    Y: number,
    M: number,
    D: number,
    delta?: number
  ): HijrDateSchema {
    let dDelta = delta ? delta : 1;
    let jd, l, jd1, n, j, td, tm, ty, tday;

    if ((Y > 1582) || ((Y == 1582) && (M > 10)) || ((Y == 1582) && (M == 10) && (D > 14))) {
      jd = intPart((1461 * (Y + 4800 + intPart((M - 14) / 12))) / 4) + intPart((367 * (M - 2 - 12 * (intPart((M - 14) / 12)))) / 12) - intPart((3 * (intPart((Y + 4900 + intPart((M - 14) / 12)) / 100))) / 4) + D - 32075 + dDelta
    } else {
      jd = 367 * Y - intPart((7 * (Y + 5001 + intPart((M - 9) / 7))) / 4) + intPart((275 * M) / 9) + D + 1729777 + dDelta
    }

    jd1 = jd - dDelta;
    l = jd - 1948440 + 10632;
    n = intPart((l - 1) / 10631);
    l = l - 10631 * n + 354;
    j = (intPart((10985 - l) / 5316)) * (intPart((50 * l) / 17719)) + (intPart(l / 5670)) * (intPart((43 * l) / 15238));
    l = l - (intPart((30 - j) / 15)) * (intPart((17719 * j) / 50)) - (intPart(j / 16)) * (intPart((15238 * j) / 43)) + 29;
    tm = intPart((24 * l) / 709);
    td = l - intPart((709 * M) / 24);
    ty = 30 * n + j - 30;
    tday = (jd1 % 7) + 1;
    tday = tday > 6 ? 0 : tday;

    return {
      year: ty,
      month: tm,
      date: td,
      dateOfWeek: tday + 1,
      dayName: this.config.DATETIME_NAME.HIJR_DAY_NAME[tday],
      monthName: this.config.DATETIME_NAME.HIJR_MONTH_NAME[tm - 1]
    };
  }

  /**
   * Gregorian To Java Date
   * @param Y Gregorian Year
   * @param M Gregorian Month [1 - 12]
   * @param D Gregorian Date
   */
  gregorianToJava(
    Y: number,
    M: number,
    D: number
  ): JavaDateSchema {
    let hb: number[] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    let ht: number = (Y - 1970) * 365 - 1;
    let hs: number = hb[M - 1] + D;
    let kab = 0;

    if (Y % 4 == 0) {
      if (M > 2)
      {
        hs++;
      }
    }

    for (let i = 1970; i < Y; i++) {
      if (i % 4 == 0)
      {
        kab++;
      }
    }

    return {
      dayJava: (ht + hs + kab) * 5,
      dayJavaName: this.config.DATETIME_NAME.JAVA_DAY_NAME[(ht + hs + kab) * 5]
    }
  }

  /**
   * Hijr To Gregorian Date
   * @param Y Hijr Year
   * @param M Hijr Month [1 - 12]
   * @param D Hijr Date
   * @param delta <Delta = 1> isna rulling
   */
  hijrToGregorian(
    Y: number,
    M: number,
    D: number,
    delta?: number
  ): GregorianDateSchema {
    let dDelta = delta ? delta : 1;
    let d = D;
    let m = M;
    let y = Y;
    let jd = intPart((11 * y + 3) / 30) + 354 * y + 30 * m - intPart((m - 1) / 2) + d + 1948440 - 385 - dDelta;
    let l, n, i, j, k, td, tm, ty, tday;

    if (jd > 2299160) {
      l = jd + 68569;
      n = intPart((4 * l) / 146097);
      l = l - intPart((146097 * n + 3) / 4);
      i = intPart((4000 * (l + 1)) / 1461001);
      l = l - intPart((1461 * i) / 4) + 31;
      j = intPart((80 * l) / 2447);
      td = l - intPart((2447 * j) / 80);
      l = intPart(j / 11);
      tm = j + 2 - 12 * l;
      ty = 100 * (n - 49) + i + l;
      tday = (jd % 7) + 1;
      tday = tday > 6 ? 0 : tday;
    } else {
      j = jd + 1402;
      k = intPart((j - 1) / 1461);
      l = j - 1461 * k;
      n = intPart((l - 1) / 365) - intPart(l / 1461);
      i = l - 365 * n + 30;
      j = intPart((80 * i) / 2447);
      td = i - intPart((2447 * j) / 80);
      i = intPart(j / 11);
      tm = j + 2 - 12 * i;
      ty = 4 * k + n + i - 4716;
      tday = (jd % 7) + 1;
      tday = tday > 6 ? 0 : tday;
    }

    return {
      year: ty,
      month: tm,
      date: td,
      dateOfWeek: tday + 1,
      dayName: this.config.DATETIME_NAME.DAY_NAME[tday],
      monthName: this.config.DATETIME_NAME.MONTH_NAME[tm - 1]
    };
  }

  /**
   * Hijr To Java Date
   * @param Y Greorgian Year
   * @param M Greorgian Month [1 - 12]
   * @param D Greorgian Date
   * @param delta <Delta = 1> isna rulling
   */
  hijrToJava(
    Y: number,
    M: number,
    D: number,
    delta?: number
  ): JavaDateSchema {
    const greorgian = this.hijrToGregorian(Y, M, D, delta);
    return this.gregorianToJava(
      greorgian.year,
      greorgian.month,
      greorgian.date
    )
  }
}