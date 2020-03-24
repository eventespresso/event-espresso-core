import useDatetimes from './useDatetimes';
import { EntityId } from '@appServices/apollo/types';

const useDatetimeIds = (): EntityId[] => {
	const datetimes = useDatetimes();

	return datetimes.map(({ id }) => id);
};

export default useDatetimeIds;
