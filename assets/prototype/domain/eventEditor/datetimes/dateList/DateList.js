import { H3 } from '@blueprintjs/core/lib/esm';
import LoadingIndicator from '../../../../application/ui/components/display/LoadingIndicator';
import ErrorIndicator from '../../../../application/ui/components/display/ErrorIndicator';
import EmptyState from '../../../../application/ui/components/display/EmptyState';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import useStatus from '../../../../application/services/apollo/status/useStatus';

import DatesListFilterBar from './filterBar/DatesListFilterBar';
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

const DateList = () => {
	const datetimes = useDatetimes();
	console.log('DateList', datetimes);
	const { isLoading, isError } = useStatus();

	const loading = isLoading('datetimes');
	const error = isError('datetimes');

	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{'Dates List'}</H3>;

	if (loading) return <LoadingIndicator header={header} message='loading dates...' />;

	if (error) return <ErrorIndicator error={error} header={header} />;

	const btnRow = (
		<div style={btnRowStyle}>
			<AddNewDateButton />
		</div>
	);

	const datesList = datetimes.length ? (
		<>
			<div style={listStyle}>
				{datetimes.map((date) => (
					<DateCard id={date.id} key={date.id} />
				))}
			</div>
			{btnRow}
		</>
	) : (
		<EmptyState description={'try changing filter settings'} title={'NO DATES FOR YOU !!!'}>
			{btnRow}
		</EmptyState>
	);

	return (
		<div>
			{header}
			<DatesListFilterBar />
			{datesList}
		</div>
	);
};

export default DateList;
