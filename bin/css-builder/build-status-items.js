const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { startCase, map } = require( 'lodash' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

/**
 * Build status items for the entity status stylesheet.
 *
 * @param {string} entityName  The name of the entity the items are for - eg.
 * Transaction
 * @param {Array} entityConfig  An array of status configuration objects for the
 * entity the statuses belong to.
 * @return {Array} An array of built item css for each status.
 */
function buildStatusItem( entityName, entityConfig ) {
	const itemTemplate = fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'entity-status-item.css.handlebars' ),
		'utf8'
	);
	const template = compile( itemTemplate );
	return entityConfig.map( ( statusConfig ) => {
		return template(
			{
				...statusConfig.color,
				status_label: `${ entityName } ${ statusConfig.status_label }`,
				status_code: statusConfig.status_code,
			}
		)
	} );
}

/**
 * Build status css groups for the entity status stylesheet.
 *
 * @param {Object} themeConfig  The theme configuration object.
 * @return {Array}  An array of built css items for each status group.
 */
function buildStatusGroups( themeConfig ) {
	const groupTemplate = fs.readFileSync(
		path.resolve( TEMPLATES_PATH, 'entity-status-group.css.handlebars' ),
		'utf8'
	);
	const template = compile( groupTemplate );
	return map( themeConfig.statuses, ( entityConfig, entityName ) => {
		return template(
			{
				group_label: startCase(
					`${ entityName } Statuses`
				),
				group_statuses: buildStatusItem( entityName, entityConfig )
			}
		);
	} );
}

module.exports = buildStatusGroups;