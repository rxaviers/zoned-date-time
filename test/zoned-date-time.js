import ZonedDateTime from "../src/zoned-date-time";
import {zoneData} from "iana-tz-data";

describe("zoned-date-time", function() {
  it("should correctly calculate trasitions and DST", function() {
    expect(new ZonedDateTime(new Date("2015-06-13T01:02:03Z"), zoneData.America.Sao_Paulo)).to.equalZonedDateTime(
      [2015, 6, 12, 22, 2, 3],
      {isDST: false}
    );

    // Testing standard time only case. Dubai has local time and then standard time, no daylight
    // savings as most of Asia countries/cities.
    expect(new ZonedDateTime(new Date("2015-06-13T01:02:03Z"), zoneData.Asia.Dubai)).to.equalZonedDateTime(
      [2015, 6, 13, 5, 2, 3],
      {isDST: false}
   );

    // Testing DST edge cases...
    // BRST (daylight savings)
    expect(new ZonedDateTime(new Date("2017-02-19T01:00:00Z"), zoneData.America.Sao_Paulo)).to.equalZonedDateTime(
      [2017, 2, 18, 23, 0, 0],
      {isDST: true}
   );

    // BRT
    expect(new ZonedDateTime(new Date("2017-02-19T02:00:00Z"), zoneData.America.Sao_Paulo)).to.equalZonedDateTime(
      [2017, 2, 18, 23, 0, 0],
      {isDST: false}
   );

    // PST
    expect(new ZonedDateTime(new Date("2017-03-12T09:00:00Z"), zoneData.America.Los_Angeles)).to.equalZonedDateTime(
      [2017, 3, 12, 1, 0, 0],
      {isDST: false}
   );

    // PDT (daylight savings)
    expect(new ZonedDateTime(new Date("2017-03-12T10:00:00Z"), zoneData.America.Los_Angeles)).to.equalZonedDateTime(
      [2017, 3, 12, 3, 0, 0],
      {isDST: true}
   );

    // ARST (it's an adhoc daylight savings using -03 offset)
    expect(new ZonedDateTime(new Date(938919600000), zoneData.America.Argentina.Buenos_Aires)).to.equalZonedDateTime(
      [1999, 10, 3, 0, 0, 0],
      {isDST: true}
   );

    // ART
    expect(new ZonedDateTime(new Date(952052400000), zoneData.America.Argentina.Buenos_Aires)).to.equalZonedDateTime(
      [2000, 3, 3, 0, 0, 0],
      {isDST: false}
   );
 });
});
