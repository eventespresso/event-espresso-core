/**
 * External dependencies
 */
import { reduce } from 'lodash';

export const buildEventOptions = ( events ) => {
	return reduce( events, function( options, event ) {
		options.push(
			{
				label: event.EVT_name,
				value: event.EVT_ID,
			},
		);
		return options;
	}, [] );
};
