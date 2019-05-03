const path = require( 'path' );
const fileUtils = require( './file-utils' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

const { getTemplateCompiler } = fileUtils;
const templateCompiler = getTemplateCompiler(
	[ TEMPLATES_PATH, 'size.css.handlebars' ]
);

const defaultFontSizeModifiers = {
	micro: .9,
	tiny: 1,
	smaller: 1.1,
	small: 1.2,
	default: 1.4,
	big: 1.6,
	bigger: 1.8,
	huge: 2.4,
	extreme: 3.2,
};
const defaultSizeModifiers = {
	micro: .125,
	tiny: .25,
	smaller: .5,
	small: .75,
	default: 1,
	big: 1.25,
	bigger: 1.5,
	huge: 1.75,
	extreme: 2,
};
const defaultRadiusModifiers = {
	small: .667,
	default: 1,
	big: 1.333,
	bigger: 2,
	huge: 4,
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
	let sizes = [];
	for ( const modifier in sizeModifiers ) {
		const value = Math.round( sizeModifiers[ modifier ] * fontSizeBase );
		if ( value >= 8 ) {
			sizes.push(
				templateCompiler( {
					modifier: `font-size-${ modifier }`,
					value,
				} )
			);
		}
	}
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
	let sizes = [];
	for ( const modifier in sizeModifiers ) {
		const value = sizeModifiers[ modifier ] * marginDefault;
		sizes.push(
			templateCompiler( {
				modifier: `margin-${ modifier }`,
				value,
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
	let sizes = [];
	for ( const modifier in sizeModifiers ) {
		const value = sizeModifiers[ modifier ] * paddingDefault;
		sizes.push(
			templateCompiler( {
				modifier: `padding-${ modifier }`,
				value,
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
	let sizes = [];
	for ( const modifier in sizeModifiers ) {
		const value = sizeModifiers[ modifier ] * radiusDefault;
		sizes.push(
			templateCompiler( {
				modifier: `border-radius-${ modifier }`,
				value: Math.round( value ),
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
