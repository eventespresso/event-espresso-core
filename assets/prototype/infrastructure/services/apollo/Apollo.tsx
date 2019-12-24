import React from 'react';
import pick from 'ramda/src/pick';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, InMemoryCacheConfig, CacheResolver, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const { graphqlEndpoint } = window;
const nonce = pick<Window, string>(['eejsdata', 'data', 'eejs_api_nonce'], window);

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

const client = new ApolloClient<NormalizedCacheObject>({
	cache,
	link,
});

const Apollo = ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default Apollo;
