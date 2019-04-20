const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { startCase } = require( 'lodash' );

/**
 * Constant for the path holding all the handlebar demo templates.
 * @type {string}
 */
const TEMPLATES_PATH = path.resolve( __dirname, 'demo-templates' );

/**
 * A function that builds the colors section for css demo html.
 * @return {string}  Colors section html.
 */
function buildColorsSection() {
	const COLORS_SECTION_TEMPLATE = fs.readFileSync( path.resolve( TEMPLATES_PATH, 'colors-section-template.html' ), 'utf8' );
	const COLORS_DEMO_ITEM_TEMPLATE = fs.readFileSync( path.resolve( TEMPLATES_PATH, 'color-demo-item.html' ), 'utf8' );

	const COLORS = [
		'pink',
		'green',
		'dark-green',
		'red',
		'orange',
		'light-blue',
		'blue',
		'yellow',
		'grey',
		'dark-grey',
		'black',
		'white',
	];
	const colorDemoItemTemplate = compile( COLORS_DEMO_ITEM_TEMPLATE );

	const colorDemoItems = COLORS.map( ( color ) => {
		return colorDemoItemTemplate(
			{
				ColorLabel: startCase( color ),
				color,
			}
		);
	} );
	const sectionTemplate = compile( COLORS_SECTION_TEMPLATE );
	return sectionTemplate( { colorDemoItems } );
}

/**
 * A function that builds an returns an array of section templates for the
 * css demo html.
 *
 * @return {string[]} An array of sections html strings.
 */
function buildSectionTemplates() {
	return [
		buildColorsSection(),
	];
}

module.exports = buildSectionTemplates;