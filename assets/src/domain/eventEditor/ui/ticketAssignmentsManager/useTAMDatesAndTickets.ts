import { useDatetimes, useTickets, useDatetimeItem, useTicketItem } from '@edtrServices/apollo/queries';
import { TAMProps, DatesAndTickets } from './types';
import { useEntityPagination } from '@appLayout/entityList/pagination';
import useDatesListFilterState from '../datetimes/datesList/filterBar/useDatesListFilterState';
import { Datetime } from '@edtrServices/apollo/types';

const useTAMDatesAndTickets = ({ assignmentType, entityId }: TAMProps): DatesAndTickets => {
	const allDatetimes = useDatetimes();
	const allTickets = useTickets();
	const singleDate = useDatetimeItem({ id: entityId });
	const singleTicket = useTicketItem({ id: entityId });
	const { filteredEntities } = useDatesListFilterState(allDatetimes);
	const { paginatedEntities: paginatedDates } = useEntityPagination<Datetime>({ entities: filteredEntities });

	switch (assignmentType) {
		case 'forAll':
			return {
				datetimes: paginatedDates,
				tickets: allTickets,
			};
		case 'forDate':
			return {
				datetimes: [singleDate],
				tickets: allTickets,
			};
		case 'forTicket':
			return {
				tickets: [singleTicket],
				datetimes: allDatetimes,
			};
	}
};

export default useTAMDatesAndTickets;
