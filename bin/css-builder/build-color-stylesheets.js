const path = require( 'path' );
const { startCase } = require( 'lodash' );
const colorUtils = require( './color-utils' );
const fileUtils = require( './file-utils' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

const {
	generateHighContrast,
	generateLowContrast,
	findContrastColor,
	generateGreysFromBg,
} = colorUtils;

const { getTemplateCompiler } = fileUtils;

/**
 * builds the theme base colors stylesheet
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function baseColors( config ) {
	const templateCompiler = getTemplateCompiler(
		[ TEMPLATES_PATH, 'base-colors.css.handlebars' ]
	);
	let colors = [];
	for ( const colorName in config.baseColors ) {
		const colorHex = config.baseColors[ colorName ];
		colors.push(
			templateCompiler(
				{
					colorLabel: startCase( colorName ),
					colorName: colorName,
					colorHex: colorHex,
					colorContrast: findContrastColor(
						colorHex,
						config.themeColors.blackAndWhiteContrast
					)
				}
			)
		);
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
	const templateCompiler = getTemplateCompiler(
		[ TEMPLATES_PATH, 'theme-colors.css.handlebars' ]
	);
	let colors = [];
	const themeColors = [ 'primary', 'secondary', 'accent' ];
	themeColors.forEach( ( themeColor ) => {
		const colorHex = config.themeColors[ themeColor ];
		const highContrast = generateHighContrast(
			colorHex,
			config.themeColors.rgbModifier,
			config.themeColors.darkTheme
		);
		const lowContrast = generateLowContrast(
			colorHex,
			config.themeColors.rgbModifier,
			config.themeColors.darkTheme
		);
		colors.push(
			templateCompiler(
				{
					themeColorLabel: startCase( themeColor ),
					themeColor: themeColor,
					colorHex: colorHex,
					highContrastColorHex: highContrast,
					lowContrastColorHex: lowContrast,
					textContrastColorHex: findContrastColor(
						colorHex,
						config.themeColors.blackAndWhiteContrast
					),
					textHighContrastColorHex: generateHighContrast(
						highContrast,
						config.themeColors.rgbModifier,
						config.themeColors.darkTheme
					),
					textLowContrastColorHex: generateHighContrast(
						lowContrast,
						config.themeColors.rgbModifier,
						config.themeColors.darkTheme
					),
				}
			)
		);
	} );
	return colors;
}

/**
 * builds the theme text colors stylesheet
 *
 * @param {Object} config The configuration object for the theme
 * @return {Array} The build content for writing to a final file.
 */
function fontColors( config ) {
	const templateCompiler = getTemplateCompiler(
		[ TEMPLATES_PATH, 'font-colors.css.handlebars' ]
	);
	const defaultText = findContrastColor(
		config.themeColors.background,
		config.themeColors.blackAndWhiteContrast
	);
	const highContrastText = generateHighContrast(
		defaultText,
		config.themeColors.rgbModifier,
		config.themeColors.darkTheme
	);
	const superHighContrastText = generateHighContrast(
		highContrastText,
		config.themeColors.rgbModifier,
		config.themeColors.darkTheme
	);
	const lowContrastText = generateLowContrast(
		defaultText,
		config.themeColors.rgbModifier,
		config.themeColors.darkTheme
	);
	const superLowContrastText = generateLowContrast(
		lowContrastText,
		config.themeColors.rgbModifier,
		config.themeColors.darkTheme
	);
	return [
		templateCompiler(
			{
				themeLabel: startCase( config.themeName ),
				textType: 'default',
				defaultText: defaultText,
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
	const background = config.themeColors.background;
	const greys = generateGreysFromBg(
		background,
		config.themeColors.darkTheme
	);
	return [
		templateCompiler(
			{
				bgColorHex: background,
				borderColorHex: findContrastColor( background, false, 'AA' ),
				grey1ColorHex: greys[ 0 ],
				grey2ColorHex: greys[ 1 ],
				grey3ColorHex: greys[ 2 ],
				grey4ColorHex: greys[ 3 ],
				grey5ColorHex: greys[ 4 ],
				grey6ColorHex: greys[ 5 ],
				grey7ColorHex: greys[ 6 ],
				grey8ColorHex: greys[ 7 ],
				grey9ColorHex: greys[ 8 ],
			}
		)
	];
}

module.exports = {
	baseColors,
	themeColors,
	fontColors,
	extraColors,
};