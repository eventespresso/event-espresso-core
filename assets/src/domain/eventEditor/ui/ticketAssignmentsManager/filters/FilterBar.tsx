import React from 'react';

import {
	DatesByMonthControl,
	ShowExpiredTicketsControl,
	ShowTrashedDatesControl,
	ShowTrashedTicketsControl,
} from './controls';
import { useTAMContext } from '../context';

const FilterBar = () => {
	const {
		assignmentType,
		filterState: {
			datesByMonth,
			setDatesByMonth,
			setShowExpiredTickets,
			setShowTrashedDates,
			setShowTrashedTickets,
			showExpiredTickets,
			showTrashedDates,
			showTrashedTickets,
		},
	} = useTAMContext();

	return (
		<div className='filter-bar'>
			{assignmentType !== 'forDate' && (
				// useless when TAM is for single date
				<>
					<DatesByMonthControl datesByMonth={datesByMonth} setDatesByMonth={setDatesByMonth} />
					<ShowTrashedDatesControl
						showTrashedDates={showTrashedDates}
						setShowTrashedDates={setShowTrashedDates}
					/>
				</>
			)}

			<ShowExpiredTicketsControl
				showExpiredTickets={showExpiredTickets}
				setShowExpiredTickets={setShowExpiredTickets}
			/>

			<ShowTrashedTicketsControl
				showTrashedTickets={showTrashedTickets}
				setShowTrashedTickets={setShowTrashedTickets}
			/>
		</div>
	);
};

export default FilterBar;
