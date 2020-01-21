import React from 'react';
import useDatetimeItem from '../data/queries/datetimes/useDatetimeItem';
import { ListItemProps } from '../types';

const DatetimeIdTag: React.FC<ListItemProps> = ({ id }): JSX.Element => {
	const { dbId } = useDatetimeItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default DatetimeIdTag;
