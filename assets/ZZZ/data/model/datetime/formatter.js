/**
 * Internal imports
 */
import * as baseFormatter from '../base-date-formatter';

/**
 * External imports
 */
import { forOwn, pullAt } from 'lodash';
import {
	TIME_FORMAT_SITE,
	DATE_TIME_FORMAT_SITE,
	allDateTimesAsString,
	SEPARATOR_SPACE_DASH_SPACE,
} from '@eventespresso/helpers';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Array of fields that have date information
 * @type { string[] }
 */
export const DATE_FIELDS = [
	'DTT_EVT_start',
	'DTT_EVT_end',
];

/**
 * Will hold the dynamically generated list of formatters for dates.  Formatters
 * are functions defined in `../base-date-formatter` but wrapped by dynamically
 * generated functions (callable via same name) that automatically receive the
 * correct dateFieldsMap argument.
 *
 * Eg.  `../base-date-formatter has
 * formatDatesOnEntities( entities, entityDateFields, format, local );
 * When importing `formatDatesOnEntities` from this file, you can call it simply
 * by doing this:
 *
 * formatDatesOnEntities( dateTimeObjects, format, local );
 *
 * Notice that it's called without the entityDateFields argument because that's
 * provided by this generator.
 *
 * @type {{}}
 */
const formatters = {};

forOwn( baseFormatter, ( implementation, functionName ) => {
	formatters[ functionName ] = ( ...incomingArgs ) => {
		const firstArg = pullAt( incomingArgs, 0 );
		return implementation( firstArg[ 0 ], DATE_FIELDS, ...incomingArgs );
	};
} );

/**
 * This will spit out a prettified label for the provided DateTime entity.
 *
 * If there is a DTT_name, the format will be:
 * `DTT_name (DTT_EVT_start - DTT_EVT_end)`
 *
 * If no DTT_name then:
 * `DTT_EVT_start - DTT_EVT_end`
 *
 * This will account for if both start and end are in the same day and simply
 * use time for the end part.
 *
 * @param { BaseEntity } DateTimeEntity
 * @return { string }  A formatted string representing the provided
 *    DateTimeEntity.
 */
export const prettyDateFromDateTime = ( DateTimeEntity ) => {
	let content = '';
	if ( isModelEntityOfModel( DateTimeEntity, 'datetime' ) ) {
		if ( DateTimeEntity.DTT_EVT_start.hasSame(
			DateTimeEntity.DTT_EVT_end,
			'day'
		) ) {
			content += allDateTimesAsString(
				SEPARATOR_SPACE_DASH_SPACE,
				DateTimeEntity.DTT_EVT_start.toFormat(
					DATE_TIME_FORMAT_SITE
				),
				DateTimeEntity.DTT_EVT_end.toFormat(
					TIME_FORMAT_SITE
				),
			);
		} else {
			content += allDateTimesAsString(
				SEPARATOR_SPACE_DASH_SPACE,
				DateTimeEntity.DTT_EVT_start.toFormat(
					DATE_TIME_FORMAT_SITE
				),
				DateTimeEntity.DTT_EVT_end.toFormat(
					DATE_TIME_FORMAT_SITE
				),
			);
		}
		content = DateTimeEntity.DTT_name ?
			`${ DateTimeEntity.DTT_name } (${ content })` :
			content;
	}
	return content;
};

export default formatters;
