import ApolloClient from 'apollo-client';
import {
	CacheResolver,
	CacheResolverMap,
	InMemoryCache,
	InMemoryCacheConfig,
	NormalizedCacheObject,
} from 'apollo-cache-inmemory';
import { BatchHttpLink } from 'apollo-link-batch-http';

const graphqlEndpoint = window?.eeEditorData?.graphqlEndpoint || '';
const nonce = window?.eejsdata?.data?.eejs_api_nonce || '';

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
	// add nonce only if exists
	const headers = nonce
		? {
				'X-WP-Nonce': nonce,
		  }
		: null;

	const link = new BatchHttpLink({
		uri: graphqlEndpoint || '/graphql',
		headers,
	});

	const client = new ApolloClient({
		cache,
		link,
	});

	return client;
};
