export interface ConfigDataSchema {
  DATETIME_NAME: {
    DAY_NAME        : string[];
    MONTH_NAME      : string[];
    HIJR_DAY_NAME   : string[];
    HIJR_MONTH_NAME : string[];
    JAVA_DAY_NAME   : string[];
  }
}

export interface HijrDateSchema {
  date: number;
  month: number;
  year: number;
  dateOfWeek: number;
  dayName: string;
  monthName: string;
}

export interface GregorianDateSchema {
  date: number;
  month: number;
  year: number;
  dateOfWeek: number;
  dayName: string;
  monthName: string;
}

export interface JavaDateSchema {
  dayJava: number;
  dayJavaName: string;
}