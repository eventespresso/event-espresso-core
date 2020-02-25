import React, { CSSProperties } from 'react';

import DateCard from './DateCard';

const listStyle: CSSProperties = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-between',
	width: '100%',
};

const CardView = ({ entities: datetimes }) => {
	return (
		<div style={listStyle}>
			{datetimes.map((date) => (
				<DateCard id={date.id} key={date.id} />
			))}
		</div>
	);
};

export default CardView;
