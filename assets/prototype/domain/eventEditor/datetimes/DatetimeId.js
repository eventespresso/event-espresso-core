import useDatetimeItem from '../data/queries/datetimes/useDatetimeItem';

const DatetimeId = ({ id }) => {
	const { dbId = null } = useDatetimeItem({ id });
	return <code>{dbId}</code>;
};

export default DatetimeId;
