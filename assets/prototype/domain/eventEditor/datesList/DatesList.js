import { Callout, H4, NonIdealState, Spinner } from '@blueprintjs/core';
import useDatesListData from '../containers/useDatesListData';
import DateCard from './DateCard';

const boxStyle = {
	padding: '2rem',
	margin: '2rem 0',
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

const DatesList = ( { eventId } ) => {
	const dates = useDatesListData( eventId );
	if ( ! Array.isArray( dates ) ) {
		return (
			<Callout style={ boxStyle }>
				<Spinner size={ Spinner.SIZE_SMALL } />
				<H4 style={ hdrStyle }>{ 'loading dates...' }</H4>
			</Callout>
		);
	}
	if ( ! dates.length ) {
		return (
			<Callout>
				<NonIdealState
					icon={ 'warning-sign' }
					title={ 'NO DATES FOR YOU !!!' }
					description={ 'try changing filter settings' }
				/>
			</Callout>
		);
	}
	return (
		<div>
			<H4>{ 'Dates List' }</H4>
			<div style={ listStyle }>
				{ dates.map(
					( date ) => <DateCard key={ date.id } date={ date } />
				) }
			</div>
		</div>
	);
};

export default DatesList;
