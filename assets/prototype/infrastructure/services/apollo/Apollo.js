import pick from 'ramda/src/pick';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const { graphqlEndpoint } = window;
const nonce = pick(['eejsdata', 'data', 'eejs_api_nonce'], window);

const getResolver = (type) => {
	return (_, args, { getCacheKey }) => getCacheKey({ __typename: type, id: args.id });
};

const cache = new InMemoryCache({
	cacheRedirects: {
		Query: {
			datetime: getResolver('EspressoDatetime'),
			ticket: getResolver('EspressoTicket'),
			price: getResolver('EspressoPrice'),
			priceType: getResolver('EspressoPriceType'),
		},
	},
});

const link = new HttpLink({
	uri: graphqlEndpoint || '/graphql',
	headers: {
		'X-WP-Nonce': nonce,
	},
});

const client = new ApolloClient({
	cache,
	link,
});

const Apollo = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default Apollo;
