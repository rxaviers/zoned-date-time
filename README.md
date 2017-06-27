# ZonedDateTime

A tiny (0.6KB) JavaScript Date with [IANA timezone](https://www.iana.org/time-zones) support.

## Usage

    npm install --save zoned-date-time iana-tz-data

```js
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
```

### I18n disclaimer

**Important note on i18n**: If you need to display such information to your users/customers, use an i18n library. For example:

- [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) (see `options.timeZone`)
- [Globalize](https://github.com/rxaviers/globalize/blob/4c5e48750a22bed83d93897d668acee26270c44a/doc/api/date/date-formatter.md) (see `options.timeZone` of `1.3.0-alpha.0` release)

## API

### Constructor

#### `new ZonedDateTime(date, timeZoneData)`

Creates a new zonedDateTime instance given a `date` and `timeZoneData`.

##### date

A [JavaScript date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), i.e., `new Date()`.

##### timeZoneData

The *zdumped* IANA timezone data (found on the [iana-tz-data](https://github.com/rxaviers/iana-tz-data) package) for the desired timeZoneId. 

### Methods

#### `.clone()`

Returns a cloned zoned date time instance.

#### `.getDate()`

Returns the day of the month.

#### `.getDay()`

Returns the day of the week.

#### `.getFullYear()`

Returns the full year, e.g., `2017`.

#### `.getHours()`

Returns the hours, ranges from `0` to `23`.

#### `.getMilliseconds()`

Returns the milliseconds.

#### `.getMinutes()`

Returns the minutes, ranges from `0` to `59`.

#### `.getMonth()`

Returns the month number, ranges from `0` to `11`.

#### `.getSeconds()`

Returns the seconds, ranges from `0` to `59`.

#### `.getTime()`

Returns the numeric value corresponding to the time for the specified date according to universal time, i.e., the epoch time.

#### `.getTimezoneOffset()`

Returns the time zone difference, in minutes, from its zone to UTC.

#### `.isDST()`

Returns a boolean indicating whether the datetime is in daylight savings mode.

#### `.setDate(dayValue)`

Sets the day of the object relative to the beginning of the currently set month according to this zone.

##### dayValue

An integer representing the day of the month.

#### `.setFullYear(yearValue)`

Sets the full year according to this zone.

##### yearValue

An integer specifying the numeric value of the year, for example, 1995.

#### `.setHours(hoursValue)`

Sets the hours according to this zone.

##### hoursValue

An integer between 0 and 23, representing the hour.

#### `.setMilliseconds(millisecondsValue)`

Sets the milliseconds according to this zone.

##### millisecondsValue

A number between 0 and 999, representing the milliseconds.

#### `.setMinutes(minutesValue)`

Sets the minutes according to this zone.

##### minutesValue

An integer between 0 and 59, representing the minutes.

#### `.setMonth(monthValue)`

Sets the month according to this zone.

##### monthValue

An integer between 0 and 11, representing the months January through December.

#### `.setSeconds(secondsValue)`

Sets the seconds according to this zone.

##### secondsValue

An integer between 0 and 59, representing the seconds.

#### `.setTime(timeValue)`

Sets the numeric value corresponding to the time for the specified date according to universal time, i.e., the epoch time.

##### timeValue

An integer representing the number of milliseconds since 1 January 1970, 00:00:00 UTC.

#### `.toDate()`

Returns the corresponding `Date` object, i.e., the equivalent date in the runtime time zone.

#### `.toISOString()`

Returns a string in *simplified* extended ISO format ([ISO 8601](http://en.wikipedia.org/wiki/ISO_8601)), which is always 24 or 27 characters long (**YYYY-MM-DDTHH:mm:ss.sssZ** or **±YYYYYY-MM-DDTHH:mm:ss.sssZ**`, respectively`). The timezone is always zero UTC offset, as denoted by the suffix "`Z`".

#### `.toJSON()`

Returns a string representation of the [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.

#### `.toUTCString()`

Converts a date to a string, using the UTC time zone.

## License

MIT © [Rafael Xavier de Souza](http://rafael.xavier.blog.br)

MIT © [Ramalingam Kandaswamy Manikandan](rajavelmani@gmail.com)
