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
	const colorsSectionTemplate = fs.readFileSync( path.resolve( TEMPLATES_PATH, 'colors-section-template.html' ), 'utf8' );
	const colorsDemoItemTemplate = fs.readFileSync( path.resolve( TEMPLATES_PATH, 'color-demo-item.html' ), 'utf8' );
	const colors = [
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
	const template = compile( colorsDemoItemTemplate );
	const colorDemoItems = colors.map( ( color ) => {
		return template(
			{
				ColorLabel: startCase( color ),
				color,
			}
		);
	} );
	const sectionTemplate = compile( colorsSectionTemplate );
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