const path = require( 'path' );
const { startCase } = require( 'lodash' );
const colorUtils = require( './color-utils' );
const fileUtils = require( './file-utils' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

const {
	generateHighContrast,
	generateLowContrast,
	findContrastColor,
	generateGreyScale,
} = colorUtils;

const { getTemplateCompiler } = fileUtils;

const colorTemplateCompiler = getTemplateCompiler(
	[ TEMPLATES_PATH, 'color.css.handlebars' ]
);

/**
 * builds the theme base colors stylesheet
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function baseColors( config ) {
	let colors = [];
	for ( const colorName in config.colors ) {
		const colorHex = config.colors[ colorName ];
		colors.push( compileColorTemplate( config, colorHex, colorName ) );
	}
	return colors;
}

/**
 * builds the main theme colors stylesheet
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function themeColors( config ) {
	let colors = [];
	const themeColors = [ 'primary', 'secondary', 'accent' ];
	themeColors.forEach( ( themeColor ) => {
		const colorHex = config.meta[ themeColor ];
		colors.push( compileColorTemplate( config, colorHex, themeColor ) );
	} );
	return colors;
}

/**
 * builds the template for the provided color
 *
 * @param {Object} config The configuration object for the theme
 * @param {string} colorHex
 * @param {string} colorName
 * @return {string} color content
 */
function compileColorTemplate( config, colorHex, colorName ) {
	const highContrastColorHex = generateHighContrast(
		colorHex,
		config.meta.rgbModifier,
		config.meta.darkTheme
	);
	const superHighContrastColorHex = generateHighContrast(
		highContrastColorHex,
		config.meta.rgbModifier,
		config.meta.darkTheme
	);
	const lowContrastColorHex = generateLowContrast(
		colorHex,
		config.meta.rgbModifier,
		config.meta.darkTheme
	);
	const superLowContrastColorHex = generateLowContrast(
		lowContrastColorHex,
		config.meta.rgbModifier,
		config.meta.darkTheme
	);
	const textContrastColorHex = findContrastColor(
		colorHex,
		config.meta.blackAndWhiteContrast
	);
	const textHighContrastColorHex = findContrastColor(
		highContrastColorHex,
		config.meta.blackAndWhiteContrast
	);
	const textLowContrastColorHex = findContrastColor(
		lowContrastColorHex,
		config.meta.blackAndWhiteContrast
	);
	const textSuperHighContrastColorHex = findContrastColor(
		superHighContrastColorHex,
		config.meta.blackAndWhiteContrast
	);
	const textSuperLowContrastColorHex = findContrastColor(
		superLowContrastColorHex,
		config.meta.blackAndWhiteContrast
	);
	return colorName === 'black' || colorName === 'white' ?
		colorTemplateCompiler( {
			isBW: true,
			colorLabel: startCase( colorName ),
			colorName,
			colorHex,
			textContrastColorHex,
		} ) :
		colorTemplateCompiler( {
			isBW: false,
			colorLabel: startCase( colorName ),
			colorName,
			colorHex,
			highContrastColorHex,
			lowContrastColorHex,
			superHighContrastColorHex,
			superLowContrastColorHex,
			textContrastColorHex,
			textHighContrastColorHex,
			textLowContrastColorHex,
			textSuperHighContrastColorHex,
			textSuperLowContrastColorHex,
		} )
}

/**
 * builds the theme text colors stylesheet
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function textColors( config ) {
	const templateCompiler = getTemplateCompiler(
		[ TEMPLATES_PATH, 'font-colors.css.handlebars' ]
	);
	const defaultText = findContrastColor(
		config.meta.background,
		config.meta.blackAndWhiteContrast
	);
	const highContrastText = generateHighContrast(
		defaultText,
		config.meta.rgbModifier,
		config.meta.darkTheme
	);
	const superHighContrastText = generateHighContrast(
		highContrastText,
		config.meta.rgbModifier,
		config.meta.darkTheme
	);
	const lowContrastText = generateLowContrast(
		defaultText,
		config.meta.rgbModifier,
		config.meta.darkTheme
	);
	const superLowContrastText = generateLowContrast(
		lowContrastText,
		config.meta.rgbModifier,
		config.meta.darkTheme
	);
	return [
		templateCompiler(
			{
				themeLabel: startCase( config.meta.name ),
				textType: 'default',
				defaultText,
				superHighContrast: superHighContrastText,
				highContrast: highContrastText,
				lowContrast: lowContrastText,
				superLowContrast: superLowContrastText,
			}
		)
	];
}

/**
 * builds the extra text colors stylesheet
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function extraColors( config ) {
	const templateCompiler = getTemplateCompiler(
		[ TEMPLATES_PATH, 'extra-colors.css.handlebars' ]
	);
	const background = config.meta.background;
	const greys = generateGreyScale(
		config.colors.black || '#000000',
		config.colors.white || '#FFFFFF',
		config.meta.darkTheme
	);
	const templateVars = {
		bgColorHex: background,
		borderColorHex: generateLowContrast(
			findContrastColor( background, false, 'AA' ),
			config.meta.rgbModifier,
			config.meta.darkTheme
		),
	};
	for ( let x = 0; x < greys.length; x++ ) {
		const y = x + 1;
		templateVars[ `grey${ y }ColorHex` ] = greys[ x ];
		templateVars[ `textOnGrey${ y }ColorHex` ] = findContrastColor(
			greys[ x ],
			config.meta.blackAndWhiteContrast
		);
	}
	return [ templateCompiler( templateVars ) ];
}

module.exports = {
	baseColors,
	themeColors,
	textColors,
	extraColors,
};