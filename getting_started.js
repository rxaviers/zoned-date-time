import ZonedDateTime from "zoned-date-time";
import {zoneData} from "iana-tz-data";
let date = new Date("2017-03-15T12:00:00Z");

let losAngelesDate = new ZonedDateTime(date, zoneData.America.Los_Angeles);
// > 2017-03-15T05:00:00.000 PDT (daylight savings)

let newYorkDate = new ZonedDateTime(date, zoneData.America.New_York);
// > 2017-03-15T08:00:00.000 EDT (daylight savings)

let saoPauloDate = new ZonedDateTime(date, zoneData.America.Sao_Paulo);
// > 2017-03-15T09:00:00.000 -03

losAngelesDate.isDST(); // > true
saoPauloDate.isDST(); // > false
