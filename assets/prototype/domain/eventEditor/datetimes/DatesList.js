import { H3 } from '@blueprintjs/core/lib/esm';
import LoadingIndicator from '../../shared/LoadingIndicator';
import ErrorIndicator from '../../shared/ErrorIndicator';
import EmptyState from '../../shared/EmptyState';

import AddNewDateButton from './AddNewDateButton';
import DateCard from './dateCard/DateCard';

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

const DatesList = ({ datetimes, error, loading, tickets }) => {
	if (!loading) {
		console.log('%c DatesList', 'color: orangered; font-size: 14px;');
		console.log('%c > datetimes:', 'color: tomato;', datetimes);
		console.log('%c > loading:', 'color: tomato;', loading);
	} else if (error) {
		console.log('%c > error:', 'color: red; font-size:16px;', error);
	}
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{'Dates List'}</H3>;

	if (loading) return <LoadingIndicator header={header} message='loading dates...' />;

	if (error) return <ErrorIndicator error={error} header={header} />;

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

	return (
		<div>
			{header}
			{datesList}
		</div>
	);
};

export default DatesList;
