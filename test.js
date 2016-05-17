// test.js

var bs2paddng = require('./')
var _ = require('lodash')

// distance from baseline
var dist_bs

// line-height
var line_ht

// Baseline offset
// (distance in ems between the baseline and
// the bottom textbox edge when line-height = 1)
var bs_offset

// Expected defaults
var bs_offset_default = .13
var line_ht_default = 1

// Always approximate values
var max_decimals = 2

function approx(val) {
	return _.round(val, max_decimals)
}

// we use lodash rounding, so let us test it
describe('Utility function `approx` should approximate with correct number of decimals', function () {
	it('should approximate with 2 decimals', function () {
		// .5 is rounded up!
		expect(approx(-1.235)).toBe(-1.23)
		expect(approx(1.235)).toBe(1.24)
		expect(approx(1.2381)).toBe(1.24)
		expect(approx(1.21246)).toBe(1.21)
		expect(approx(-1.21246)).toBe(-1.21)
	})
})


describe('Illegal arguments', function () {
	it('only finte numbers are allowed as arguments', function () {
		expect(function () { return bs2paddng.top('33')}).toThrow()
	})
	it('methods should be called with at least one argument', function () {
		expect(bs2paddng.top).toThrow()
	})
})



describe('For default values,', function () {

	describe('when baseline offset 0 and line height 1', function () {
	  it('bottom should return distance to baseline', function () {
	    expect(bs2paddng.bottom(3, 1, 0)).toBe(3)
	    expect(bs2paddng.bottom(1.93, 1, 0)).toBe(1.93)
	  })

	  it('top should return distance to baseline - 1 (the default line height)', function () {
	    expect(bs2paddng.top(3, 1, 0)).toBe(2)
	    expect(bs2paddng.top(1.89, 1, 0)).toBe(0.89)
	  })

	  it('baseline offset should assume the default when missing', function () {

	  		// The computed padding-top should equal the desired distance to baseline minus (1 - offset)
		    expect(bs2paddng.top(22, 1)).toBe(21.13)
		    expect(bs2paddng.top(2.87, 1)).toBe(2)

		    // The computed padding-bottom should equal the desired distance to baseline minus the offset
		    expect(bs2paddng.bottom(22, 1)).toBe(21.87)
		    expect(bs2paddng.bottom(2.13, 1)).toBe(2)
	  })
	})

	describe('when baseline offset is 0', function() {
		it('should ', function () {

  		// The computed padding-top should equal the distance to baseline - 1 + half-leading
	    expect(bs2paddng.top(3, 2, 0)).toBe(1.5)
	    expect(bs2paddng.top(30, 1.2, 0)).toBe(28.9)

	    // The computed padding-bottom should equal the distance to baseline - half-leading
	    expect(bs2paddng.bottom(3, 3, 0)).toBe(2)
	    expect(bs2paddng.bottom(1.2, 1.4, 0)).toBe(1)
		})

	})
})
