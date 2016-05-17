// index.js

"use strict";

var _ = require('lodash')

// Default baseline offset is set to .13em 
// http://jsbin.com/bolehe/16/edit
var bs_offset_default = .13

// Default line height is assumed 1 if not specified
var line_ht_default = 1

var foo = function() {
  throw new Error("foo bar baz");
};

module.exports = {

	top: function (dist_bs, line_ht, bs_offset) {
		if (!_.isFinite(dist_bs)) {
		  throw new Error("The first argument must be a Number");
		}
		!_.isUndefined(line_ht) || (line_ht = line_ht_default)
		!_.isUndefined(bs_offset) || (bs_offset = bs_offset_default)
		var lead = line_ht - 1

		return _.round(dist_bs - (1 - bs_offset) - lead / 2, 2)
	},

	bottom: function (dist_bs, line_ht, bs_offset) {
		!_.isUndefined(line_ht) || (line_ht = line_ht_default)
		!_.isUndefined(bs_offset) || (bs_offset = bs_offset_default)
		var lead = line_ht - 1

		return _.round(dist_bs - bs_offset - lead / 2, 2)
	}

}
