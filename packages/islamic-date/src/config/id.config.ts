import { ConfigDataSchema } from "src/types";

export const IndonesianConfig: ConfigDataSchema = {
  DATETIME_NAME: {
    DAY_NAME: [
      "Minggu",
      "Senin", 
      "Selasa",
      "Rabu",
      "Kamis",
      "Jum'at",
      "Sabtu"
    ],
    MONTH_NAME: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ],
    HIJR_DAY_NAME: [
      "Ahad",
      "Al-Ithnayn",
      "Thulatha",
      "Arbaa",
      "Khams",
      "Jumuah",
      "Sabt"
    ],
    HIJR_MONTH_NAME: [
      "Muharram",
      "Safar",
      "Rabi' al-Awwal",
      "Rabi' al-Sani",
      "Jumad al-Ula",
      "Jumad al-Saniyyah",
      "Rajab",
      "Sya'ban",
      "Ramadhan",
      "Syawwal",
      "Zul-Qa'dah",
      "Zul-Hijjah"
    ],
    JAVA_DAY_NAME: [
      "Wage",
      "Kliwon",
      "Legi",
      "Pahing",
      "Pon"
    ]
  }
}