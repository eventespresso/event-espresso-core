import { Entity } from '@appServices/apollo/types';
import { getCacheIds } from '@appServices/predicates';

const entityListCacheIdString = <E extends Entity>(entities: E[]): string => JSON.stringify(getCacheIds(entities));

export default entityListCacheIdString;
