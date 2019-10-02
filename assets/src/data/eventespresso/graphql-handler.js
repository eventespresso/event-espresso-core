/**
 * External imports
 */
import { gql } from 'apollo-boost';
/**
 * Internal imports
 */
import client from './graphql-client';
import defaultFetchHandler from './default-fetch-handler';

const REST_PATH_REGEX = {
	datetimes: /^ee\/v[^\/]+?\/events\/([0-9]+?)\/datetimes\?/,
	venues: /^ee\/v[^\/]+?\/events\/([0-9]+?)\/venues\?/,
	tickets: /^ee\/v[^\/]+?\/datetimes\/([0-9]+?)\/tickets?/,
};

export const setFetchHandler = ( apiFetch, request ) => {
	if ( request.path && REST_PATH_REGEX.datetimes.test( request.path ) ) {
		apiFetch.setFetchHandler( graphqlFetchHandler );
	} else {
		apiFetch.setFetchHandler( defaultFetchHandler );
	}
};

const graphqlFetchHandler = ( options ) => {
	const { path } = options;

	const { 1: eventId } = REST_PATH_REGEX.datetimes.exec( path );

	const responsePromise = getEventDates( eventId );

	const checkForErrors = ( response ) => {
		const { errors: [ error ] = [] } = response;
		if ( error && error.message ) {
			throw {
				code: 'unknown_error',
				message: error.message,
			};
		}
		return response;
	};

	const parseResponse = ( { data: result } ) => {
		return Promise.resolve( JSON.parse( result.eventBy.eventDates ) );
	};

	return responsePromise
		.then( checkForErrors )
		.then( parseResponse )
		.catch( ( response ) => {
			const {
				networkError: { statusCode = 0 } = {},
				graphQLErrors: [ e = {} ] = [],
				code,
				message,
			} = response;

			let error;

			if ( code ) {
				error = response;
			} else if ( statusCode ) {
				error = {
					code: 'network_error',
					message,
				};
			} else {
				error = {
					code: 'graphql_error',
					message: e.message || message,
				};
			}
			throw error;
		} );
};

const getEventDates = ( eventId ) => {
	const options = {
		query: gql`
			query getEvent($eventId:Int!) {
				eventBy(eventId: $eventId) {
					eventDates
				}
			}
		`,
		variables: {
			eventId,
		},
	};

	return client.query( options );
};
