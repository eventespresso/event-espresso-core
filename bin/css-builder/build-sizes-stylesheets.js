const path = require( 'path' );
const fileUtils = require( './file-utils' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

const { getTemplateCompiler } = fileUtils;
const templateCompiler = getTemplateCompiler(
	[ TEMPLATES_PATH, 'size.css.handlebars' ]
);

const defaultFontSizeModifiers = {
	micro: .06,
	tiny: .07,
	smaller: .08,
	small: .09,
	default: .1,
	big: .12,
	bigger: .15,
	huge: .2,
	extreme: .3,
};
const defaultSizeModifiers = {
	nano: .125,
	micro: .25,
	tiny: .5,
	smaller: .75,
	small: 1,
	default: 1.5,
	big: 2,
	bigger: 2.5,
	huge: 3,
	extreme: 4,
};
const defaultRadiusModifiers = {
	none: 0,
	small: 1,
	default: 2,
	big: 4,
	bigger: 8,
	huge: 16,
	full: 1000,
};

/**
 * Builds the font sizes variable css files for the given theme.
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function fontSizes( config ) {
	const sizeModifiers = config.sizes.fontSizeModifiers ?
		config.sizes.fontSizeModifiers :
		defaultFontSizeModifiers;
	const fontSizeBase = config.sizes.fontSizeBase;
	const fontUnits = config.sizes.fontUnits || 'rem';
	let sizes = [];
	for ( const modifier in sizeModifiers ) {
		let value = sizeModifiers[ modifier ] * fontSizeBase;
		value = value.toFixed( 2 );
		sizes.push(
			templateCompiler( {
				modifier: `font-size-${ modifier }`,
				value: value + fontUnits,
			} )
		);
	}
	sizes.push(
		templateCompiler( {
			modifier: 'line-height-modifier',
			value: config.sizes.lineHeightModifier ?
				config.sizes.lineHeightModifier :
				1.5,
		} )
	);
	return sizes;
}

/**
 * Builds the margin sizes variable css files for the given theme.
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function marginSizes( config ) {
	const sizeModifiers = config.sizes.marginSizeModifiers ?
		config.sizes.marginSizeModifiers :
		defaultSizeModifiers;
	const marginDefault = config.sizes.marginDefault;
	const marginUnits = config.sizes.marginUnits || 'rem';
	let sizes = [];
	for ( const modifier in sizeModifiers ) {
		const value = sizeModifiers[ modifier ] * marginDefault;
		sizes.push(
			templateCompiler( {
				modifier: `margin-${ modifier }`,
				value: value + marginUnits,
			} )
		);
	}
	return sizes;
}

/**
 * Builds the padding sizes variable css files for the given theme.
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function paddingSizes( config ) {
	const sizeModifiers = config.sizes.paddingSizeModifiers ?
		config.sizes.paddingSizeModifiers :
		defaultSizeModifiers;
	const paddingDefault = config.sizes.paddingDefault;
	const paddingUnits = config.sizes.paddingUnits || 'rem';
	let sizes = [];
	for ( const modifier in sizeModifiers ) {
		const value = sizeModifiers[ modifier ] * paddingDefault;
		sizes.push(
			templateCompiler( {
				modifier: `padding-${ modifier }`,
				value: value + paddingUnits,
			} )
		);
	}
	return sizes;
}

/**
 * Builds the border radius sizes variable css files for the given theme.
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function radiusSizes( config ) {
	const sizeModifiers = config.sizes.radiusSizeModifiers ?
		config.sizes.radiusSizeModifiers :
		defaultRadiusModifiers;
	const radiusDefault = config.sizes.radiusDefault;
	const radiusUnits = config.sizes.radiusUnits || 'px';
	let sizes = [];
	for ( const modifier in sizeModifiers ) {
		const value = sizeModifiers[ modifier ] * radiusDefault;
		sizes.push(
			templateCompiler( {
				modifier: `border-radius-${ modifier }`,
				value: Math.round( value ) + radiusUnits,
			} )
		);
	}
	return sizes;
}

module.exports = {
	fontSizes,
	marginSizes,
	paddingSizes,
	radiusSizes,
};
