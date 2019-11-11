import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const { graphqlEndpoint, eejsdata: { data } } = window;

const cache = new InMemoryCache();
const client = new ApolloClient( {
	cache,
	link: new HttpLink( {
		uri: graphqlEndpoint || '/graphql',
		headers: {
			'X-WP-Nonce': data.eejs_api_nonce,
		},
	} ),
} );

const Apollo = ( { children } ) => (
	<ApolloProvider client={ client }>
		{ children }
	</ApolloProvider>
);

export default Apollo;
