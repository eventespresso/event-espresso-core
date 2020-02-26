import React from 'react';
import DateCard from './DateCard';

import './styles.scss';

const DateCardList = ({ entities: datetimes }) => {
	return (
		<div className='event-editor-date-card-list'>
			{datetimes.map((date) => (
				<DateCard id={date.id} key={date.id} />
			))}
		</div>
	);
};

export default DateCardList;
