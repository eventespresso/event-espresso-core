import useDatetimes from './useDatetimes';

const useDatetimeIds = () => {
	const datetimes = useDatetimes();

	return datetimes.map(({ id }) => id);
};

export default useDatetimeIds;
