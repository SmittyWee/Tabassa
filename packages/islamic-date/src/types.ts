export interface HijriyahDate {
  /** Set the day as a number (1-30) */
  // setDate(t: number): number;
  /** Set the year (optionally month and day) */
  // setFullYear(t: number): number;
  /** Set the month (0-11) */
  // setMonth(t: number): number;
  /** Set the time (milliseconds since Shawwal 23, 1389 H) */
  // setTime(t: number): number;
  
  getDate(): number;
  getMonth(): number;
  getFullYear(): number;
}

export interface HijriyahDateConstructor {
  new(): HijriyahDate;
  new(value: number | string): HijriyahDate;
  new(year: number, month: number, date?: number): HijriyahDate;
}