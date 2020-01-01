/**
 * External dependencies
 */
import { H3 } from '@blueprintjs/core/lib/esm';
import DatesListFilterBar from './filterBar/DatesListFilterBar';
import AddNewDateButton from './AddNewDateButton';
import DateCard from '../dateCard/DateCard';

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

const DatesList = ({ datetimes }: DatesListProps) => {
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{'Dates List'}</H3>;

	const datesList = (
		<>
			<div style={listStyle}>
				{datetimes.map((date) => (
					<DateCard id={date.id} key={date.id} />
				))}
			</div>
			<AddNewDateButton />
		</>
	);

	return (
		<div>
			{header}
			<DatesListFilterBar />
			{datesList}
		</div>
	);
};

export default DatesList;
