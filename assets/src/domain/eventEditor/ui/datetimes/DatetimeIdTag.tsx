import React from 'react';
import useDatetimeItem from '../../services/apollo/queries/datetimes/useDatetimeItem';
import { ListItemProps } from '../../interfaces/types';

const DatetimeIdTag: React.FC<ListItemProps> = ({ id }) => {
	const { dbId } = useDatetimeItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default DatetimeIdTag;
