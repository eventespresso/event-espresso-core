import { H3 } from '@blueprintjs/core/lib/esm';
import EmptyState from '../../../shared/EmptyState';
import EntityListFilterBar from '../../../shared/entityListFilterBar';
import useDatesListFilterManager from '../../containers/dates/useDatesListFilterManager';

import AddNewDateButton from './AddNewDateButton';
import DateCard from '../dateCard/DateCard';

const listStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-between',
	width: '100%',
};

const btnRowStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%',
};

const DateList = ({ datetimes, tickets }) => {
	const { setListView, setGridView } = useDatesListFilterManager({ datetimes });

	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{'Dates List'}</H3>;

	const btnRow = (
		<div style={btnRowStyle}>
			<AddNewDateButton tickets={tickets} />
		</div>
	);

	const datesList = datetimes.length ? (
		<>
			<div style={listStyle}>
				{datetimes.map((date) => (
					<DateCard id={date.id} key={date.id} tickets={tickets} />
				))}
			</div>
			{btnRow}
		</>
	) : (
		<EmptyState description={'try changing filter settings'} title={'NO DATES FOR YOU !!!'}>
			{btnRow}
		</EmptyState>
	);

	const listId = 'event-editor-dates-list';
	const entityListFilterBarProps = {
		listId,
		setListView,
		setGridView,
	};

	return (
		<div>
			{header}
			<EntityListFilterBar {...entityListFilterBarProps} />
			{datesList}
		</div>
	);
};

export default DateList;
