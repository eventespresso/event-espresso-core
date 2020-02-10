import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';
import { H3 } from '@blueprintjs/core/lib/esm';

import DatesListFilterBar from './filterBar/DatesListFilterBar';
import AddNewDateButton from './AddNewDateButton';
import DatetimeCard from '../dateCard/DateCard';
import { Datetime } from '../../../services/apollo/types';
import { EspressoDragSortingTable } from '@application/ui/layout';

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

	const data = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
		},
	];

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
	];

	return (
		<div>
			<EspressoDragSortingTable columns={columns} data={data} />
			{header}
			<DatesListFilterBar />
			{datetimesList}
		</div>
	);
};

export default List;
