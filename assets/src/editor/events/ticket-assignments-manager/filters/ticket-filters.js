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
	showArchivedTicketsAction,
	showExpiredTicketsAction,
} from './actions';

const { FormColumn } = twoColumnAdminFormLayout;

/**
 * controls for toggling ticket filters
 *
 * @function
 * @param {boolean} showArchivedTickets
 * @param {boolean} showExpiredTickets
 * @param {number} ticketFiltersOffset
 * @param {Function} setFilter
 * @return {Object} rendered ticket filter toggles
 */
const TicketFilters = ( {
	showArchivedTickets,
	showExpiredTickets,
	ticketFiltersOffset,
	setFilter,
} ) => {
	const toggleArchivedTickets = useCallback(
		() => setFilter( showArchivedTicketsAction ),
		[ setFilter, showArchivedTicketsAction ]
	);
	const toggleExpiredTickets = useCallback(
		() => setFilter( showExpiredTicketsAction ),
		[ setFilter, showExpiredTicketsAction ]
	);
	return (
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
	);
};

export default TicketFilters;
