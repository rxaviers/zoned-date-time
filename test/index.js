"use strict";

require("babel-core/register");

var chai = require("chai");
global.expect = chai.expect;

chai.use(require("./zoned-date-time-chai-plugin"));
