const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { startCase, map } = require( 'lodash' );

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

function buildEntityStatusSection( themeConfig ) {
	const sectionTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'entity-status-section.html' ),
		'utf-8'
	) );
	const sectionGroupTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'entity-status-group.html' ),
		'utf-8'
	) );
	const sectionItemTemplate = compile( fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'entity-status-item.html' ),
		'utf8'
	) );
	const entityGroups = map( themeConfig.statuses, ( entityConfig, entityName ) => {
		return sectionGroupTemplate(
			{
				entityName: startCase( entityName ),
				entityItems: entityConfig.map( ( {
					status_label,
					status_code
				} ) => {
					return sectionItemTemplate(
						{
							statusLabel: `${ startCase( entityName ) } ${ startCase( status_label ) }`,
							statusCode: status_code
						}
					);
				} ),
			}
		);
	} );
	return sectionTemplate( { entityGroups } );
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
		buildColorsSection(),
		buildEntityStatusSection( themeConfig ),
	];
}

module.exports = buildSectionTemplates;