import React, { CSSProperties } from 'react';

import DatetimeCard from '../../dateCard/DateCard';

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
				<DatetimeCard id={date.id} key={date.id} />
			))}
		</div>
	);
};

export default Grid;
