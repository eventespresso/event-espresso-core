/* CONSTANTS */
const REGEX_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const REGEX_HEX_SHORTHAND = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
// how many shades of grey we want
const GREYSCALE_LEVELS = 15;
// as we approach the background color for the theme,
// we want to reduce the amount of variation between greys
// in order to allow for more subtle variations
// which can have a huge affect on appearances.
// this number determines when to reduce
// the difference between the shades of grey
const GREYSCALE_HALF_STEPS = 3;
// 0.2122307574140552 is the color luminance for 7f7f7f grey
// which is the exact middle of the hex color code spectrum
// and although .5 is the middle of the luminance scale
// it seemed to me that only really bright colors had values
// above .25 or so, which is why I'm using this value
const MID_LUMINANCE = .25;

/**
 * converts RGB color code to HEX color code
 *
 * @param {Object} rgb 	ex: { r: 255, g: 255, b: 255 }
 * @return {string} color hex code ex: #FFFFFF
 */
const rgbToHex = ( rgb ) => {
	return "#" + (
		( 1 << 24 ) + ( rgb.r << 16 ) + ( rgb.g << 8 ) + rgb.b
	).toString( 16 ).slice( 1 );
};

/**
 * converts HEX color code to RGB color code
 *
 * @param {string} hex color code    ex: #FFFFFF
 * @return {Object} rgb color object ex: { r: 255, g: 255, b: 255 }
 */
const hexToRgb = ( hex ) => {
	hex = convertHexTriplet( hex );
	const result = REGEX_HEX.exec( hex );
	return result ? {
		r: parseInt( result[ 1 ], 16 ),
		g: parseInt( result[ 2 ], 16 ),
		b: parseInt( result[ 3 ], 16 )
	} : null;
};

/**
 * converts shorthand HEX color code to full hex code
 *
 * @param {string} hex    ex: #03F
 * @return {string} hex    ex: #0033FF
 */
const convertHexTriplet = ( hex ) => {
	return hex.replace( REGEX_HEX_SHORTHAND, ( m, r, g, b ) => {
		return r + r + g + g + b + b;
	} );
};

/**
 * don't know what this does because it is not explained
 * on the page I got it from: https://www.w3.org/TR/WCAG20-TECHS/G17.html
 * but it obviously imbues some sort of magic on the passed number
 *
 * @param {number} value single value from rgb object
 * @return {number} magic
 */
const magicAdjustment = ( value ) => {
	return Math.pow( ( value + 0.055 ) / 1.055, 2.4 );
};

/**
 * see https://www.w3.org/TR/WCAG20-TECHS/G17.html
 *
 * @param {Object} rgb    ex: { r: 255, g: 255, b: 255 }
 * @return {number} luminance value from 0 to 1
 */
const relativeLuminance = ( rgb ) => {
	let r = rgb.r / 255;
	let g = rgb.g / 255;
	let b = rgb.b / 255;
	r = r <= 0.03928 ? r / 12.92 : magicAdjustment( r );
	g = g <= 0.03928 ? g / 12.92 : magicAdjustment( g );
	b = b <= 0.03928 ? b / 12.92 : magicAdjustment( b );
	return r * 0.2126 + g * 0.7152 + b * 0.0722;
};

/**
 * see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 *
 * @param {Object} rgb1    ex: { r: 255, g: 255, b: 255 }
 * @param {Object} rgb2    ex: { r: 0, g: 0, b: 0 }
 * @return {number} numerator value for contrast ratio
 */
const contrastRatio = ( rgb1, rgb2 ) => {
	let rl1 = relativeLuminance( rgb1 );
	let rl2 = relativeLuminance( rgb2 );
	if ( rl1 < rl2 ) {
		// do the chevy shuffle if first color's luminance is lower
		const l1 = rl2;
		const l2 = rl1;
		rl1 = l1;
		rl2 = l2;
	}
	return ( rl1 + 0.05 ) / ( rl2 + 0.05 );
};

/**
 * see https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast
 *
 * @param {number} contrastRatio numerator
 * @return {string} 'AAA', 'AA' or 'FAIL'
 */
const wcagScore = ( contrastRatio ) => {
	return contrastRatio >= 7 ? 'AAA' : contrastRatio >= 4.5 ? 'AA' : 'FAIL';
};

/**
 * attempts to find a color that contrasts the provided color
 * and meets the designated WCAG score level
 *
 * @param {string|Object} color hex code or rgb object
 * @param {boolean} bw whether to only return black and white
 * @param {string} level desired WCAG score level of 'AAA' or 'AA'
 * @return {string} HEX color code
 */
const findContrastColor = ( color, bw = false, level = 'AAA' ) => {
	color = typeof color === 'string' ? hexToRgb( color ) : color;
	level = level === 'AAA' ? 'AAA' : 'AA';
	let score = 'FAIL';
	const modRgb = { r: 1, g: 1, b: 1 };
	const colorLuminance = relativeLuminance( color );
	if ( bw ) {
		return colorLuminance < MID_LUMINANCE ? '#FFFFFF' : '#000000';
	}
	const add = colorLuminance < MID_LUMINANCE;
	let color2 = modifyRgb( color, modRgb, add );
	// keep modifying the color until score matches desired level
	// OR we hit pure black or pure white
	while ( score !== level && ! (
		( color2.r === 0 && color2.g === 0 && color2.b === 0 ) ||
		( color2.r === 255 && color2.g === 255 && color2.b === 255 )
	) ) {
		color2 = modifyRgb( color2, modRgb, add );
		score = wcagScore( contrastRatio( color, color2 ) );
	}
	return rgbToHex( color2 );
};

/**
 * given the r, g, or b value from the theme's black and white colors,
 * will calculate the difference between the two
 *
 * @param {number } black single r, g, or b value for the theme's black color
 * @param {number } white single r, g, or b value for the theme's white color
 * @return {number} difference between supplied value and black or white
 */
const calculateBwDifference = ( black, white ) => {
	// dark colors have low rgb values like 25 (or whatever)
	// whereas whites have higher rgb values like 255
	// so we'll subtract black from white to get 230 (or whatever)
	// and then divide that by the number of greyscale levels
	// to get a "step" value of 23 (or whatever)
	// which is what we will use to incrementally generate our greys
	return Math.round(
		( white - black ) / ( GREYSCALE_LEVELS - GREYSCALE_HALF_STEPS )
	);
};

/**
 * given the hex code color for the theme's black and white colors,
 * will find set number (GREYSCALE_LEVELS) of incrementally darker or
 * lighter shades of grey that are evenly distributed between the two
 *
 * @param {string } black hex code for theme's black color
 * @param {string } white hex code for theme's black color
 * @param {boolean} darkTheme whether theme is dark
 * @return {Array} 9 grey HEX colors from near black to near white
 */
const generateGreyScale = ( black, white, darkTheme = false ) => {
	const blackRgb = hexToRgb( black );
	const whiteRgb = hexToRgb( white );
	// compute step difference between black and white
	const rgbMod = {
		r: calculateBwDifference( blackRgb.r, whiteRgb.r ),
		g: calculateBwDifference( blackRgb.g, whiteRgb.g ),
		b: calculateBwDifference( blackRgb.b, whiteRgb.b ),
	};
	// add bg color to our array of greys
	let rgbGrey = darkTheme ? [ blackRgb ] : [ whiteRgb ];
	// add 10 steps towards background color
	for ( let x = 0; x < GREYSCALE_LEVELS; x++ ) {
		rgbGrey.push(
			modifyRgb(
				rgbGrey[ x ],
				rgbMod,
				darkTheme,
				x < GREYSCALE_HALF_STEPS + 1
			)
		);
	}
	// flip the array
	rgbGrey = rgbGrey.reverse();
	// convert 10 of the rgb colors to hex (this will skip the background)
	const hexGreys = [];
	for ( let x = 0; x < GREYSCALE_LEVELS; x++ ) {
		hexGreys.push( rgbToHex( rgbGrey[ x ] ) );
	}
	return hexGreys;
};

/**
 * adds or subtracts the values of one rgb object to or from the other
 *
 * @param {Object} color  	the rgb color object to be modified
 * @param {Object} rgbMod  	the rgb values to add or subtract
 * @param {boolean} add 	whether to add colors or subtract them
 * @param {boolean} halfStep 	if true, applies half of modRgb value
 * @return {Object} rgb    ex: { r: 255, g: 255, b: 255 }
 */
const modifyRgb = ( color, rgbMod, add = false, halfStep = false ) => {
	const modRgb = halfStep ? {
		r: Math.round( rgbMod.r / GREYSCALE_HALF_STEPS ),
		g: Math.round( rgbMod.g / GREYSCALE_HALF_STEPS ),
		b: Math.round( rgbMod.b / GREYSCALE_HALF_STEPS ),
	} : rgbMod;
	color = add ? {
		r: color.r + modRgb.r,
		g: color.g + modRgb.g,
		b: color.b + modRgb.b,
	} : {
		r: color.r - modRgb.r,
		g: color.g - modRgb.g,
		b: color.b - modRgb.b,
	};
	return add ? {
		r: color.r <= 255 ? color.r : 255,
		g: color.g <= 255 ? color.g : 255,
		b: color.b <= 255 ? color.b : 255,
	} : {
		r: color.r >= 0 ? color.r : 0,
		g: color.g >= 0 ? color.g : 0,
		b: color.b >= 0 ? color.b : 0,
	};
};

/**
 * modifies the supplied color and returns one that
 * has a higher contrast compared to the background
 * ie: returned color is farther from the background color
 *
 * @param {string} hex    		hex color code
 * @param {Object} modRgb    	the rgb values to add or subtract
 * @param {boolean} darkTheme 	will add modifiers if darkTheme
 * @return {string} hex ex: #FFFFFF
 */
const generateHighContrast = ( hex, modRgb, darkTheme = false ) => {
	let color = hexToRgb( hex );
	color = modifyRgb( color, modRgb, darkTheme );
	return rgbToHex( color )
};

/**
 * modifies the supplied color and returns one that
 * has a lower contrast compared to the background
 * ie: returned color is closer to the background color
 *
 * @param {string} hex            hex color code
 * @param {Object} modRgb        the rgb values to add or subtract
 * @param {boolean} darkTheme    will subtract modifiers if darkTheme
 * @return {string} hex ex: #FFFFFF
 */
const generateLowContrast = ( hex, modRgb, darkTheme = false ) => {
	let color = hexToRgb( hex );
	color = modifyRgb( color, modRgb, ! darkTheme );
	return rgbToHex( color )
};


/**
 * @param {string} background hex color code for theme background
 * @return {boolean} true if theme background has a low luminance value
 */
const isDarkTheme = ( background ) => {
	return relativeLuminance( hexToRgb( background ) ) < 0.5;
};

/**
 * returns an rgb color object whose values are the difference
 * between the values of the two supplied rgb color objects
 *
 * @param {Object} color1  rgb color object ex: { r: 255, g: 255, b: 255 }
 * @param {Object} color2  rgb color object ex: { r: 200, g: 200, b: 200 }
 * @return {Object} rgb color object difference ex: { r: 55, g: 55, b: 55 }
 */
const difference = ( color1, color2 ) => {
	color1 = typeof color1 === 'string' ? hexToRgb( color1 ) : color1;
	color2 = typeof color2 === 'string' ? hexToRgb( color2 ) : color2;
	let rl1 = relativeLuminance( color1 );
	let rl2 = relativeLuminance( color2 );
	return rl1 > rl2 ? {
		r: color1.r - color2.r,
		g: color1.g - color2.g,
		b: color1.b - color2.b,
	} : {
		r: color2.r - color1.r,
		g: color2.g - color1.g,
		b: color2.b - color1.b,
	}
};

module.exports = {
	GREYSCALE_LEVELS,
	generateHighContrast,
	findContrastColor,
	generateGreyScale,
	generateLowContrast,
	isDarkTheme,
};

