import isNull from 'lodash/isNull';
import { Callout, H3, H6, NonIdealState, Spinner } from '@blueprintjs/core/lib/esm';
import useDatesListData from '../containers/useDatesListData';
import AddNewDateButton from './AddNewDateButton';
import DateCard from './DateCard';

const boxStyle = {
	padding: '2rem',
	textAlign: 'center',
	width: '100%'
};

const hdrStyle = {
	color: 'grey',
	margin: '1rem 0 0'
};

const listStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-between',
	width: '100%'
};

const btnRowStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'flex-end',
	margin: '0 0 2rem',
	width: '100%'
};

const DatesList = ({ datetimes, error, eventId, loading }) => {
	console.log('%c DatesList', 'color: #1BE7FF;');
	console.log('%c > datetimes:', 'color: #99c043;', datetimes);
	console.log('%c > loading:', 'color: #99c043;', loading);
	console.log('%c > error:', 'color: #99c043;', error);
	const header = <H3 style={{ margin: '2rem 0 1rem' }}>{'Dates List'}</H3>;

	if (loading) {
		return (
			<>
				{header}
				<Callout style={boxStyle}>
					<Spinner size={Spinner.SIZE_SMALL} />
					<H6 style={hdrStyle}>{'loading dates...'}</H6>
				</Callout>
			</>
		);
	}
	if (error) {
		return (
			<>
				{header}
				<Callout style={boxStyle}>
					<NonIdealState
						icon={'warning-sign'}
						title={'KA-BLOO-EE !!!'}
						description={error}
					/>
				</Callout>
			</>
		);
	}

	const btnRow = (
		<div style={btnRowStyle}>
			<AddNewDateButton eventId={eventId} />
		</div>
	);

	const datesList =
		datetimes && datetimes.length ? (
			<>
				<div style={listStyle}>
					{datetimes.map((date) => (
						<DateCard key={date.id} id={date.id} />
					))}
				</div>
				{btnRow}
			</>
		) : (
			<>
				<Callout>
					<NonIdealState
						icon={'help'}
						title={'NO DATES FOR YOU !!!'}
						description={'try changing filter settings'}
					/>
				</Callout>
				{btnRow}
			</>
		);

	return (
		<div>
			{header}
			{datesList}
		</div>
	);
};

export default DatesList;
