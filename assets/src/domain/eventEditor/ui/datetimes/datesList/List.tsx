import React, { CSSProperties } from 'react';
import { H3 } from '@blueprintjs/core/lib/esm';

import DatesListFilterBar from './filterBar/DatesListFilterBar';
import AddNewDateButton from './AddNewDateButton';
import DatetimeCard from '../dateCard/DateCard';
import { Datetime } from '../../../services/apollo/types';
import { __ } from '@wordpress/i18n';

const listStyle: CSSProperties = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-between',
	width: '100%',
};

interface ListProps {
	datetimes: Datetime[];
}

const List: React.FC<ListProps> = ({ datetimes }) => {
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{__('Dates List')}</H3>;

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

export default List;
