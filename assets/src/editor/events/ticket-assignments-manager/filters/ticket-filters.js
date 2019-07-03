/**
 * External imports
 */
import { Fragment } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

const { FormColumn } = twoColumnAdminFormLayout;

/**
 * controls for toggling ticket filters
 *
 * @function
 * @param {boolean} showArchivedTickets
 * @param {boolean} showExpiredTickets
 * @param {Function} toggleArchivedTickets
 * @param {Function} toggleExpiredTickets
 * @param {boolean} showDateFilters
 * @param {boolean} showTicketFilters
 * @return {Object} rendered ticket filter toggles
 */
const TicketFilters = ( {
	showArchivedTickets,
	showExpiredTickets,
	toggleArchivedTickets,
	toggleExpiredTickets,
	showDateFilters,
	showTicketFilters,
} ) => {
	const ticketFiltersOffset = showDateFilters && showTicketFilters ? 0 : 7;
	return showTicketFilters ? (
		<Fragment>
			<FormColumn colSize={ '2h' } offset={ ticketFiltersOffset }>
				<ToggleControl
					checked={ showArchivedTickets }
					instanceId={ 'showArchivedTickets' }
					label={ showArchivedTickets ?
						__(
							'archived tickets shown',
							'event_espresso'
						) : __(
							'show archived tickets?',
							'event_espresso'
						) }
					onChange={ toggleArchivedTickets }
				/>
			</FormColumn>
			<FormColumn colSize={ '2h' }>
				<ToggleControl
					checked={ showExpiredTickets }
					instanceId={ 'showExpiredTickets' }
					label={ showExpiredTickets ?
						__(
							'expired tickets shown',
							'event_espresso'
						) : __(
							'show expired tickets?',
							'event_espresso'
						) }
					onChange={ toggleExpiredTickets }
				/>
			</FormColumn>
		</Fragment>
	) : null;
};

export default TicketFilters;
