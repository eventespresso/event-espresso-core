/**
 * External dependencies
 */
import * as React from 'react';
import { H3 } from '@blueprintjs/core/lib/esm';
import DatesListFilterBar from './filterBar/DatesListFilterBar';
import AddNewDateButton from './AddNewDatetimeButton';
import DatetimeCard from '../datetimeCard/DatetimeCard';

/**
 * Internal dependencies
 */
import { Datetime } from '../../data/types';

const listStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-between',
	width: '100%',
};

interface DatesListProps {
	datetimes: Datetime[];
}

const DatetimesList = ({ datetimes }: DatesListProps) => {
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{'Dates List'}</H3>;

	const datetimesList = (
		<>
			<div style={listStyle}>
				{datetimes.map((date) => (
					<DatetimeCard id={date.id} key={date.id} />
				))}
			</div>
			<AddNewDateButton />
		</>
	);

	return (
		<div>
			{header}
			<DatesListFilterBar />
			{datetimesList}
		</div>
	);
};

export default DatetimesList;
