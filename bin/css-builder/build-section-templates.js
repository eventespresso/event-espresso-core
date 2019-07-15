const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { startCase } = require( 'lodash' );
const { GREYSCALE_LEVELS } = require( './color-utils' );
const {
	themeColors,
	themeColorDesc,
	defaultSizes,
	defaultRadii,
	fontSizeDesc,
	fontSizeColors,
	loremIpsum,
	entityStatusGroups,
} = require( './default-data' );

/**
 * Constant for the path holding all the handlebar demo templates.
 * @type {string}
 */
const TEMPLATES_PATH = path.resolve( __dirname, 'demo-templates' );

/**
 * A function that builds the colors section for css demo html.
 *
 * @param {Object} themeConfig  The configuration object for the theme.
 * @return {string}  Colors section html.
 */
function buildColorsSection( themeConfig ) {
	const colorsSectionTemplate = fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'colors-section-template.html' ),
		'utf8'
	);
	const baseColorsTemplate = fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'base-color-template.html' ),
		'utf8'
	);
	const themeColorsTemplate = fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'theme-color-template.html' ),
		'utf8'
	);
	const baseTemplate = compile( baseColorsTemplate );
	const themeTemplate = compile( themeColorsTemplate );
	const colorDemoItems = [];
	themeColors.map( ( color ) => {
		colorDemoItems.push(
			themeTemplate( {
				colorLabel: startCase( color ),
				color,
				desc: themeColorDesc[ color ],
				isDefault: color === 'default',
			} )
		);
	} );
	const baseColorItems = [];
	for ( const color in themeConfig.colors ) {
		baseColorItems.push(
			baseTemplate( {
				colorLabel: startCase( color ),
				color,
				isGrey: false,
				isBW: color === 'black' || color === 'white',
			} )
		);
	}
	/// now add grey scale levels
	const greys = [];
	for ( let x = 1; x <= GREYSCALE_LEVELS; x++ ) {
		const color = `grey-${ x }`;
		greys.push(
			baseTemplate( {
				colorLabel: startCase( color ),
				color,
				isGrey: true,
			} )
		);
	}
	const sectionTemplate = compile( colorsSectionTemplate );
	return sectionTemplate( {
		themeColors: colorDemoItems,
		baseColors: baseColorItems,
		greys,
	} );
}

/**
 * A function that builds the entity status section for the css demo html
 *
 * @return {string} Status section html.
 */
function buildEntityStatusSection() {
	const sectionTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'entity-status-section.html' ),
		'utf-8'
	) );
	const sectionGroupTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'entity-status-group.html' ),
		'utf-8'
	) );
	const sectionItemTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'entity-status-template.html' ),
		'utf8'
	) );
	const entityGroups = [];

	for ( const entityName in entityStatusGroups ) {
		const entityStatuses = entityStatusGroups[ entityName ];
		entityGroups.push(
			sectionGroupTemplate(
				{
					entityName: startCase( entityName ),
					entityItems: entityStatuses.map(
						( { label, code } ) => {
						return sectionItemTemplate(
							{
								statusLabel: `${ startCase( entityName ) } ${ startCase( label ) }`,
								statusCode: code
							}
						);
					} ),
				}
			)
		);
	};
	return sectionTemplate( { entityGroups } );
}

/**
 * A function that builds the button section for the css demo html.
 *
 * @return {string} The section html.
 */
function buildButtonSection() {
	const sectionTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'button-section.html' ),
		'utf-8'
	) );
	const sectionItemTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'button-template.html' ),
		'utf8'
	) );

	const sectionItems = [];
	themeColors.map( ( color ) => {
		sectionItems.push(
			sectionItemTemplate( {
				colorLabel: startCase( color ),
				color,
			} )
		);
	} );
	return sectionTemplate( { sectionItems } );
}

/**
 * A function that builds the shadows section for the css demo html.
 *
 * @param {Array} colors  An array of color configuration objects
 * @return {string}  The section html
 */
function buildShadowsSection( { colors } ) {
	const sectionTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'shadows-section.html' ),
		'utf-8'
	) );
	const sectionItemTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'shadows-template.html' ),
		'utf8'
	) );
	const boxShadowSizes = [ 'tiny', 'small', 'default', 'big' ];
	const sectionItems = boxShadowSizes.map( ( size ) => {
		return sectionItemTemplate( {
			size,
			notTiny: size !== 'tiny',
		} );
	} );
	return sectionTemplate( { sectionItems } );
}

/**
 * A function the builds the sizes section for the css demo html
 *
 * @param {Object} sizes
 * @return {string} The section html.
 */
function buildSizesSection( { sizes } ) {
	const sectionTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'size-section-template.html' ),
		'utf8'
	) );
	const fontSizeTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'font-size-template.html' ),
		'utf8'
	) );
	const marginSizeTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'margin-size-template.html' ),
		'utf8'
	) );
	const paddingSizeTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'padding-size-template.html' ),
		'utf8'
	) );
	const borderSizeTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'border-radius-template.html' ),
		'utf8'
	) );
	const defaultFontSizes = defaultSizes.reverse();
	// const sizesCount = defaultFontSizes.length;
	const fontSizes = defaultFontSizes.map(
		( size, index ) => {
			return fontSizeTemplate( {
				size,
				priority: index + 1,
				color: fontSizeColors[ size ],
				desc: fontSizeDesc[ size ],
				example: shorterIpsum( loremIpsum, index )
			} )
		}
	);
	defaultSizes.reverse();
	const marginSizes = defaultSizes.map(
		( size ) => marginSizeTemplate( { size } )
	);
	const paddingSizes = defaultSizes.map(
		( size ) => paddingSizeTemplate( { size } )
	);
	const radiusSizes = defaultRadii.map(
		( size ) => borderSizeTemplate( { size } )
	);
	return sectionTemplate( {
		fontSizes,
		marginSizes,
		paddingSizes,
		radiusSizes,
	} );
}

function shorterIpsum( longerIpsum, index ) {
	const length = ( ( index + 5 ) * ( index + 5 ) * ( index + 1 ) ) + 5;
	return longerIpsum.length > length ?
		longerIpsum.substr( 0, longerIpsum.lastIndexOf( ' ', length ) ) :
		longerIpsum;
}

/**
 * A function that builds an returns an array of section templates for the
 * css demo html.
 *
 * @return {string[]} An array of sections html strings.
 */

/**
 * A function that builds an returns an array of section templates for the
 * css demo html.
 *
 * @param {Object} themeConfig  The configuration object for the theme.
 * @return {Array} An array of sections for the main template.
 */
function buildSectionTemplates( themeConfig ) {
	return [
		buildColorsSection( themeConfig ),
		buildEntityStatusSection(),
		buildButtonSection(),
		buildSizesSection( themeConfig ),
		buildShadowsSection( themeConfig ),
	];
}

module.exports = buildSectionTemplates;