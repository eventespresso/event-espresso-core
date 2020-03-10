import { WriteQueryOptions } from '@edtrServices/apollo/queries/types';

export type CacheUpdaterFn<TData = any> = (writeOptions?: WriteQueryOptions<TData>) => void;
