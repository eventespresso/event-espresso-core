/**
 * External imports.
 */
import { select, dispatch } from '@wordpress/data';

/**
 * To show the changes in ticket details
 * trigger the ticket UI update wihout any side effect.
 */
const useTriggerTicketUiUpdate = () => {
	const listId = 'event-editor-ticket-list';
	const defaultDisplayDate = 'start';
	const storeKey = 'eventespresso/filter-state';
	const { getFilter } = select( storeKey );
	const { setFilter } = dispatch( storeKey );

	return () => {
		const displayDate = getFilter(
			listId,
			'displayTicketDate',
			defaultDisplayDate
		);
		const intermediateValue = displayDate === 'start' ? 'end' : 'start';
		// Set the display date to the intermediate value.
		setFilter(
			listId,
			'displayTicketDate',
			intermediateValue
		);
		// Restore the actual value.
		setFilter(
			listId,
			'displayTicketDate',
			displayDate
		);
	};
};

export default useTriggerTicketUiUpdate;
