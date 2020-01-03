import useDatetimeItem from '../data/queries/datetimes/useDatetimeItem';

const DatetimeId = ({ id }) => {
	const { dbId } = useDatetimeItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default DatetimeId;
