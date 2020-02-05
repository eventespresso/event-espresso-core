import { WriteQueryOptions } from '../../../../eventEditor/services/apollo/queries/types';

export type CacheUpdaterFn<TData = any> = (writeOptions?: WriteQueryOptions<TData>) => void;
