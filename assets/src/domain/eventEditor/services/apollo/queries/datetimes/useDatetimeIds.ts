import useDatetimes from './useDatetimes';
import { EntityId } from '@appServices/apollo/types';

const useDatetimeIds = (): EntityId[] => {
	const datetimes = useDatetimes();

	// Sort the IDs list which may be out of order,
	// thus changing the key used to access apollo cache
	return datetimes.map(({ id }) => id).sort();
};

export default useDatetimeIds;
