import { NextPage } from "next";
import { HijrDate } from "@tabassa/islamic-date";

const IslamicDatePackages: NextPage = () => {
  console.log(new HijrDate(1443, 9, 30).gregorian);

  return <>
  
  </>
}

export default IslamicDatePackages;