import { WriteQueryOptions } from '../../../eventEditor/data/queries/types';

export type CacheUpdaterFn<TData = any> = (writeOptions?: WriteQueryOptions<TData>) => void;
