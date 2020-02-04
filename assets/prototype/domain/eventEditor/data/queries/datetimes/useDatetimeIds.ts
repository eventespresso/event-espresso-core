import useDatetimes from './useDatetimes';
import { EntityId } from '../../types';

const useDatetimeIds = (): EntityId[] => {
	const datetimes = useDatetimes();

	return datetimes.map(({ id }) => id);
};

export default useDatetimeIds;
