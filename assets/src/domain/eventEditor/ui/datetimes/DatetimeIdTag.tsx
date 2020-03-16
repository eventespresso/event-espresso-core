import React from 'react';
import useDatetimeItem from '@edtrServices/apollo/queries/datetimes/useDatetimeItem';
import { EntityListItemProps } from '@appLayout/entityList';

const DatetimeIdTag: React.FC<EntityListItemProps> = ({ id }) => {
	const { dbId } = useDatetimeItem({ id }) || {};
	return dbId ? <code>{dbId}</code> : null;
};

export default DatetimeIdTag;
