import React, { CSSProperties } from 'react';

import DateCard from '../cardView/DateCard';

const listStyle: CSSProperties = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-between',
	width: '100%',
};

const Grid = ({ entities: datetimes }) => {
	return (
		<div style={listStyle}>
			{datetimes.map((date) => (
				<DateCard id={date.id} key={date.id} />
			))}
		</div>
	);
};

export default Grid;
