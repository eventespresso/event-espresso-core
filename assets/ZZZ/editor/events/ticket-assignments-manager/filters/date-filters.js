/**
 * External imports
 */
import { Fragment, useCallback } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import {
	showArchivedDatesAction,
	showExpiredDatesAction,
} from './actions';

const { FormColumn } = twoColumnAdminFormLayout;

/**
 * controls for toggling date filters
 *
 * @function
 * @param {boolean} showDateFilters
 * @param {boolean} showArchivedDates
 * @param {boolean} showExpiredDates
 * @param {number} dateFiltersOffset
 * @param {Function} setFilter
 * @return {Object} rendered date filter toggles
 */
const DateFilters = ( {
	showDateFilters,
	showArchivedDates,
	showExpiredDates,
	dateFiltersOffset,
	setFilter,
} ) => {
	const toggleArchivedDates = useCallback(
		() => setFilter( showArchivedDatesAction ),
		[ setFilter, showArchivedDatesAction ]
	);
	const toggleExpiredDates = useCallback(
		() => setFilter( showExpiredDatesAction ),
		[ setFilter, showExpiredDatesAction ]
	);
	return showDateFilters && (
		<Fragment>
			<FormColumn colSize={ '2h' } offset={ dateFiltersOffset }>
				<ToggleControl
					checked={ showArchivedDates }
					instanceId={ 'showArchivedDates' }
					label={ showArchivedDates ?
						__(
							'archived dates shown',
							'event_espresso'
						) : __(
							'show archived dates?',
							'event_espresso'
						) }
					onChange={ toggleArchivedDates }
				/>
			</FormColumn>
			<FormColumn colSize={ '2h' }>
				<ToggleControl
					checked={ showExpiredDates }
					instanceId={ 'showExpiredDates' }
					label={
						showExpiredDates ?
							__(
								'expired dates shown',
								'event_espresso'
							) : __(
								'show expired dates?',
								'event_espresso'
							)
					}
					onChange={ toggleExpiredDates }
				/>
			</FormColumn>
		</Fragment>
	);
};

export default DateFilters;
