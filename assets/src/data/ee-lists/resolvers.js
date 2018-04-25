/**
 * WordPress dependencies
 */
import apiRequest from '@wordpress/api-request';

/**
 * Internal dependencies
 */
import { setRequested, receiveResponse } from './actions';
import { applyQueryString } from '../model/endpoints';

export async function* getEvents( state, queryString ) {
	if ( state.event &&
		state.event.hasOwnProperty( queryString ) &&
		state.event[ queryString ] !== null
	) {
		yield receiveResponse( 'event', queryString, state.event[ queryString ] );
	}
	yield setRequested( 'event', queryString );
	const events = await apiRequest( {
		path: applyQueryString( 'event',
			queryString,
		),
	} );
	yield receiveResponse( 'event', queryString, events );
}
