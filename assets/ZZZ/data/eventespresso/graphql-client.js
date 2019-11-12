/**
 * External imports
 */
import ApolloClient from 'apollo-boost';

const { graphqlEndpoint, eejsdata: { data } } = window;

const client = new ApolloClient( {
	uri: graphqlEndpoint || '/graphql',
	request: ( operation ) => {
		operation.setContext( {
			headers: {
				'X-WP-Nonce': data.eejs_api_nonce,
			},
		} );
	},
} );

export default client;
