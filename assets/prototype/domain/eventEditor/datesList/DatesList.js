import { Callout, H3, H6, NonIdealState, Spinner } from '@blueprintjs/core/lib/esm';
import AddNewDateButton from './AddNewDateButton';
import DateCard from './dateCard/DateCard';

const boxStyle = {
	padding: '2rem',
	textAlign: 'center',
	width: '100%',
};

const hdrStyle = {
	color: 'grey',
	margin: '1rem 0 0',
};

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

const DatesList = ({ datetimes, error, eventId, loading, tickets }) => {
	console.log('%c DatesList', 'color: orangered; font-size: 14px;');
	console.log('%c > datetimes:', 'color: tomato;', datetimes);
	console.log('%c > loading:', 'color: tomato;', loading);
	console.log('%c > error:', 'color: tomato;', error);
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{'Dates List'}</H3>;

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
					<NonIdealState icon={'warning-sign'} title={error.code} description={error.message} />
				</Callout>
			</>
		);
	}

	const btnRow = (
		<div style={btnRowStyle}>
			<AddNewDateButton eventId={eventId} tickets={tickets} />
		</div>
	);

	const datesList =
		Array.isArray(datetimes) && datetimes.length ? (
			<>
				<div style={listStyle}>
					{datetimes.map((date) => (
						<DateCard eventId={eventId} id={date.id} key={date.id} />
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
