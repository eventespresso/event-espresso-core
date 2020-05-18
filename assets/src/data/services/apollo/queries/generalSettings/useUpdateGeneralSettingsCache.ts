import { CacheUpdaterFn, WriteQueryOptions } from '../types';
import useUpdateCache from '../useUpdateCache';
import { GeneralSettingsData } from '@application/valueObjects/config/types';

const useUpdateGeneralSettingsCache = (
	writeQueryOptions: WriteQueryOptions<GeneralSettingsData> = undefined
): CacheUpdaterFn<GeneralSettingsData> => {
	return useUpdateCache<GeneralSettingsData>(writeQueryOptions);
};

export default useUpdateGeneralSettingsCache;
