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
 * @param {boolean} showFilterNotice
 * @param {number} dateFiltersOffset
 * @return {Object} rendered filter notice
 */
const FilterNotice = ( { dateFiltersOffset } ) => {
	return (
		<FormInfo
			formInfo={ __(
				'Not seeing any dates or tickets? Try changing the filters above.',
				'event_espresso'
			) }
			dashicon={ 'warning' }
			dismissable={ false }
			colSize={ 12 - dateFiltersOffset }
			offset={ dateFiltersOffset }
		/>
	);
};

export default FilterNotice;
