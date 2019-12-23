import useDatetimes from './useDatetimes';
import { Datetime, EntityId } from '../../types';

const useDatetimeIds = (): EntityId[] => {
	const datetimes: Datetime[] = useDatetimes();

	return datetimes.map(({ id }: Datetime) => id);
};

export default useDatetimeIds;
