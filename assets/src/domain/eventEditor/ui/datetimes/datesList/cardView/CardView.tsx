import React from 'react';
import DateCard from './DateCard';
import { EntityListComponentProps } from '@appLayout/entityList';

import { Datetime } from '../../../../services/apollo/types';
import './styles.scss';

const CardView: React.FC<EntityListComponentProps<Datetime>> = ({ entities: datetimes }) => {
	return (
		<div className='event-editor-dates-list-card-view'>
			{datetimes.map((date) => (
				<DateCard id={date.id} key={date.id} />
			))}
		</div>
	);
};

export default CardView;
