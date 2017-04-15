function definePrivateProperty(object, property, value) {
  Object.defineProperty(object, property, {
    value: value
  });
}

function getUntilsIndex(original, untils) {
  var index = 0;
  var originalTime = original.getTime();

  // TODO Should we do binary search for improved performance?
  while (index < untils.length - 1 && originalTime >= untils[index]) {
    index++;
  }
  return index;
}

function setWrap(fn) {
  var offset1 = this.getTimezoneOffset();
  var ret = fn();
  this.original.setTime(new Date(this.getTime()));
  var offset2 = this.getTimezoneOffset();
  this.original.setMinutes(this.original.getMinutes() + offset2 - offset1);
  return ret;
}

var ZonedDateTime = function(date, timeZoneData) {
  definePrivateProperty(this, "original", new Date(date.getTime()));
  definePrivateProperty(this, "local", new Date(date.getTime()));
  definePrivateProperty(this, "timeZoneData", timeZoneData);
  definePrivateProperty(this, "setWrap", setWrap);
  if (!(timeZoneData.untils && timeZoneData.offsets && timeZoneData.isdsts)) {
    throw new Error("Invalid IANA data");
  }
  this.setTime(this.local.getTime() - this.getTimezoneOffset() * 60 * 1000);
};

ZonedDateTime.prototype.clone = function() {
  return new ZonedDateTime(this.original, this.timeZoneData);
};

ZonedDateTime.prototype.getFullYear = function() {
  return this.local.getUTCFullYear();
};

ZonedDateTime.prototype.getMonth = function() {
  return this.local.getUTCMonth();
};

ZonedDateTime.prototype.getDate = function() {
  return this.local.getUTCDate();
};

ZonedDateTime.prototype.getDay = function() {
  return this.local.getUTCDay();
};

ZonedDateTime.prototype.getHours = function() {
  return this.local.getUTCHours();
};

ZonedDateTime.prototype.getMinutes = function() {
  return this.local.getUTCMinutes();
};

ZonedDateTime.prototype.getSeconds = function() {
  return this.local.getUTCSeconds();
};

ZonedDateTime.prototype.getMilliseconds = function() {
  return this.local.getUTCMilliseconds();
};

// Note: Define .valueOf = .getTime for arithmetic operations like date1 - date2.
ZonedDateTime.prototype.valueOf =
ZonedDateTime.prototype.getTime = function() {
  return this.local.getTime() + this.getTimezoneOffset() * 60 * 1000;
};

ZonedDateTime.prototype.getTimezoneOffset = function() {
  var index = getUntilsIndex(this.original, this.timeZoneData.untils);
  return this.timeZoneData.offsets[index];
};

ZonedDateTime.prototype.setFullYear = function(year) {
  var local = this.local;
  return this.setWrap(function() {
    return local.setUTCFullYear(year);
  });
};

ZonedDateTime.prototype.setMonth = function(month) {
  var local = this.local;
  return this.setWrap(function() {
    return local.setUTCMonth(month);
  });
};

ZonedDateTime.prototype.setDate = function(date) {
  var local = this.local;
  return this.setWrap(function() {
    return local.setUTCDate(date);
  });
};

ZonedDateTime.prototype.setHours = function(hour) {
  var local = this.local;
  return this.setWrap(function() {
    return local.setUTCHours(hour);
  });
};

ZonedDateTime.prototype.setMinutes = function(minutes) {
  var local = this.local;
  return this.setWrap(function() {
    return local.setUTCMinutes(minutes);
  });
};

ZonedDateTime.prototype.setSeconds = function(seconds) {
  var local = this.local;

  // setWrap is needed here just because abs(seconds) could be >= a minute.
  return this.setWrap(function() {
    return local.setUTCSeconds(seconds);
  });
};

ZonedDateTime.prototype.setMilliseconds = function(milliseconds) {
  var local = this.local;

  // setWrap is needed here just because abs(seconds) could be >= a minute.
  return this.setWrap(function() {
    return local.setUTCMilliseconds(milliseconds);
  });
};

ZonedDateTime.prototype.setTime = function(time) {
  return this.local.setTime(time);
};

ZonedDateTime.prototype.isDST = function() {
  var index = getUntilsIndex(this.original, this.timeZoneData.untils);
  return Boolean(this.timeZoneData.isdsts[index]);
};

ZonedDateTime.prototype.inspect = function() {
  var index = getUntilsIndex(this.original, this.timeZoneData.untils);
  var abbrs = this.timeZoneData.abbrs;
  return this.local.toISOString().replace(/Z$/, "") + " " +
    (abbrs && abbrs[index] + " " || (this.getTimezoneOffset() * -1) + " ") +
    (this.isDST() ? "(daylight savings)" : "");
};

module.exports = ZonedDateTime;
