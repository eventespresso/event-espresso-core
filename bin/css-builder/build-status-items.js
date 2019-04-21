const fs = require( 'fs' );
const path = require( 'path' );
const { compile } = require( 'handlebars' );
const { startCase, map } = require( 'lodash' );

const TEMPLATES_PATH = path.resolve( __dirname, 'css-templates' );

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