import useDatetimes from './useDatetimes';
import { EntityId } from '@appServices/apollo/types';
import { getGuids } from '@appServices/predicates';

const useDatetimeIds = (): EntityId[] => {
	const datetimes = useDatetimes();

	return getGuids(datetimes);
};

export default useDatetimeIds;
