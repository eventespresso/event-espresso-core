import React from 'react';
import useDatetimeItem from '@edtrServices/apollo/queries/datetimes/useDatetimeItem';
import { ListItemProps } from '@edtrInterfaces/types';

const DatetimeIdTag: React.FC<ListItemProps> = ({ id }) => {
	const { dbId } = useDatetimeItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default DatetimeIdTag;
