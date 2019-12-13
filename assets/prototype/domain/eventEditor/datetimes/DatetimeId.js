import useDateItem from '../data/queries/datetimes/useDateItem';

const DatetimeId = ({ id }) => {
	const { dbId = null } = useDateItem({ id });
	return <code>{dbId}</code>;
};

export default DatetimeId;
