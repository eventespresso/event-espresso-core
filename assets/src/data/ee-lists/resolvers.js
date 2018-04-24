/**
 * WordPress dependencies
 */
import apiRequest from '@wordpress/api-request';

/**
 * Internal dependencies
 */
import { setRequested, receiveResponse } from './actions';
import { applyQueryString } from '../model/endpoints';

export function getEvents( state, queryString ) {
	return state.event.hasOwnProperty( queryString ) ?
		function( eventQueryString ) {
			return setRequested( 'event',
				eventQueryString,
			);
		} :
		async function * () {
			yield setRequested( 'event', queryString );
			const events = await apiRequest( {
				path: applyQueryString( 'event',
					queryString,
				),
			} );
			yield receiveResponse( 'event', queryString, events );
		};
}
