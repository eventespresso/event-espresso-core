import { pathOr } from 'ramda';
import ApolloClient from 'apollo-client';
import {
	InMemoryCache,
	InMemoryCacheConfig,
	CacheResolver,
	CacheResolverMap,
	NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const graphqlEndpoint = pathOr<string>('', ['eeEditorData', 'graphqlEndpoint'], window);
const nonce = pathOr<string>('', ['eejsdata', 'data', 'eejs_api_nonce'], window);

const getResolver = (type: string): CacheResolver => {
	const resolver: CacheResolver = (_, args, { getCacheKey }) => getCacheKey({ __typename: type, id: args.id });
	return resolver;
};

export const resolverMap: CacheResolverMap = {
	Query: {
		datetime: getResolver('EspressoDatetime'),
		ticket: getResolver('EspressoTicket'),
		price: getResolver('EspressoPrice'),
		priceType: getResolver('EspressoPriceType'),
	},
};

const cacheConfig: InMemoryCacheConfig = {
	cacheRedirects: resolverMap,
};
export const cache = new InMemoryCache(cacheConfig);

export const getClient = (): ApolloClient<NormalizedCacheObject> => {
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

	return client;
};
