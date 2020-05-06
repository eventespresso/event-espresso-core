import useDatetimes from './useDatetimes';
import { EntityId } from '@dataServices/types';
import { getGuids } from '@appServices/predicates';

const useDatetimeIds = (): EntityId[] => {
	const datetimes = useDatetimes();

	return getGuids(datetimes);
};

export default useDatetimeIds;
