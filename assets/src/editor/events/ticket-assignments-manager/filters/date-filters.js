/**
 * External imports
 */
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

const { FormColumn } = twoColumnAdminFormLayout;

/**
 * controls for toggling date filters
 *
 * @function
 * @param {boolean} showArchivedDates
 * @param {boolean} showExpiredDates
 * @param {Function} toggleArchivedDates
 * @param {Function} toggleExpiredDates
 * @param {number} dateFiltersOffset
 * @return {Object} rendered date filter toggles
 */
const DateFilters = ( {
	showArchivedDates,
	showExpiredDates,
	toggleArchivedDates,
	toggleExpiredDates,
	dateFiltersOffset,
} ) => {
	return (
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
