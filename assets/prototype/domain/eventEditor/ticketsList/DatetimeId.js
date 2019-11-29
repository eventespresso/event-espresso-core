import useDateItem from '../containers/queries/useDateItem';

const DatetimeId = ({ id }) => {
	const { datetimeId = null } = useDateItem({ id });
	return <code>{datetimeId}</code>;
};

export default DatetimeId;
