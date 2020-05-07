import { pluck } from 'ramda';

import { Cacheable, Entity } from '@dataServices/types';

export const getGuids = pluck<keyof Pick<Entity, 'id'>>('id');

export const getCacheIds = pluck<keyof Pick<Cacheable, 'cacheId'>>('cacheId');
