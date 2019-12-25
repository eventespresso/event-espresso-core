import React from 'react';
import { pathOr } from 'ramda';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, InMemoryCacheConfig, CacheResolver } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const graphqlEndpoint = pathOr<string>('', ['graphqlEndpoint'], window);
const nonce = pathOr<string>('', ['eejsdata', 'data', 'eejs_api_nonce'], window);

const getResolver = (type: string): CacheResolver => {
	const resolver: CacheResolver = (_, args, { getCacheKey }) => getCacheKey({ __typename: type, id: args.id });
	return resolver;
};

const config: InMemoryCacheConfig = {
	cacheRedirects: {
		Query: {
			datetime: getResolver('EspressoDatetime'),
			ticket: getResolver('EspressoTicket'),
			price: getResolver('EspressoPrice'),
			priceType: getResolver('EspressoPriceType'),
		},
	},
};

const cache = new InMemoryCache(config);

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

const Apollo = ({ children }) => <ApolloProvider client={client} children={children} />;

export default Apollo;
