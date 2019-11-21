import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import get from 'lodash/get';

const { graphqlEndpoint } = window;
const nonce = get(window, ['eejsdata', 'data', 'eejs_api_nonce']);

const cache = new InMemoryCache({
	cacheRedirects: {
		Query: {
			datetime: (_, args, { getCacheKey }) =>
				getCacheKey({ __typename: 'Datetime', id: args.id }),
			ticket: (_, args, { getCacheKey }) =>
				getCacheKey({ __typename: 'Ticket', id: args.id })
		}
	}
});

const link = new HttpLink({
	uri: graphqlEndpoint || '/graphql',
	headers: {
		'X-WP-Nonce': nonce
	}
});

const client = new ApolloClient({
	cache,
	link
});

const Apollo = ({ children }) => (
	<ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Apollo;
