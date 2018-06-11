/**
 * External dependencies
 */
import { reduce } from 'lodash';

/**
 * A default map used for mapping options for select.
 * @type {Object}
 */
const DEFAULT_MODEL_OPTIONS_MAP = {
	event: {
		label: 'EVT_name',
		value: 'EVT_ID',
	},
	datetime: {
		label: 'DTT_name',
		value: 'DTT_ID',
	},
	ticket: {
		label: 'TKT_name',
		value: 'TKT_ID',
	},
};

export const OPTION_SELECT_ALL = 'ALL';

/**
 * Receives an array of event entities and returns an array of simple objects
 * that can be passed along to the options array used for the WordPress
 * SelectControl component.
 *
 * @param { Array } entities
 * @param { string } modelName
 * @param { string } addAllOptionLabel  If present then options array will be
 * 										prepended with an "ALL" option meaning
 * 										that all options are selected.
 * @param { Object } map
 * @return { Array }  Returns an array of simple objects formatted for any
 * select control that receives its options in the format of an array of objects
 * with label and value keys.
 */
const buildOptions = (
	entities,
	modelName,
	addAllOptionLabel = '',
	map = DEFAULT_MODEL_OPTIONS_MAP,
) => {
	const MAP_FOR_MODEL = map[ modelName ] ? map[ modelName ] : false;
	const generatedOptions = entities && modelName && MAP_FOR_MODEL ?
		reduce( entities, function( options, entity ) {
			if ( entity[ MAP_FOR_MODEL.label ] &&
				entity[ MAP_FOR_MODEL.value ] ) {
				options.push(
					{
						label: entity[ MAP_FOR_MODEL.label ],
						value: entity[ MAP_FOR_MODEL.value ],
					},
				);
			}
			return options;
		}, [] ) :
		[];
	if ( addAllOptionLabel !== '' ) {
		generatedOptions.unshift( {
			label: addAllOptionLabel,
			value: OPTION_SELECT_ALL,
		} );
	}
	return generatedOptions;
};

export default buildOptions;
