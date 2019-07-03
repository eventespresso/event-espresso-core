/**
 * External imports
 */
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

const { FormInfo } = twoColumnAdminFormLayout;

/**
 * FormInfo component about ticket filters
 *
 * @function
 * @param {number} dateCount
 * @param {number} ticketCount
 * @param {boolean} showDateFilters
 * @param {boolean} showTicketFilters
 * @return {Object} rendered filter notice
 */
const FilterNotice = ( {
	dateCount,
	ticketCount,
	showDateFilters,
	showTicketFilters,
} ) => {
	const dateFiltersOffset = showDateFilters && showTicketFilters ? 2 : 7;
	return dateCount < 1 || ticketCount < 1 ?
		<FormInfo
			formInfo={ __(
				'Not seeing any dates or tickets? Try changing the filters above.',
				'event_espresso'
			) }
			dashicon={ 'warning' }
			dismissable={ false }
			colSize={ 12 - dateFiltersOffset }
			offset={ dateFiltersOffset }
		/> :
		null;
};

export default FilterNotice;
