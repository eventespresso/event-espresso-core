/**
 * External imports.
 */
import { useSelect, dispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';

import useDatesListFilterState
	from '../../dates-and-times/editor-date/filter-bar/use-dates-list-filter-state';

const EMPTY_ARRAY = [];

/**
 * useTicketsForEventEditorTicketList
 *
 * A custom react hook for retrieving the related ticket entities
 * for the given event date entities from the eventespresso/core store state.
 *
 * @param {boolean} isChained
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */
const useTicketsForEventEditorTicketList = ( isChained ) => {
	const { filteredDateIds } = useDatesListFilterState( {
		listId: 'event-editor-dates-list',
	} );

	const [ finishedResolution, setFinishedResolution ] = useState( false );
	const { resolveGetRelatedEntitiesForIds } = dispatch( 'eventespresso/core' );
	if ( ! finishedResolution &&
		Array.isArray( filteredDateIds ) &&
		filteredDateIds.length
	) {
		// Finish the resolution for visible datetimes.
		resolveGetRelatedEntitiesForIds(
			'datetime',
			{ ticket: filteredDateIds },
			false
		);
		setFinishedResolution( true );
	}

	return useSelect( ( select ) => {
		if ( filteredDateIds === null ) {
			return { tickets: EMPTY_ARRAY, ticketsLoaded: false };
		}
		const {
			getEntitiesForModel,
			getRelatedEntitiesForIds,
		} = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		let tickets = EMPTY_ARRAY;
		let ticketsLoaded = false;
		if ( isChained ) {
			tickets = getRelatedEntitiesForIds(
				'datetime',
				filteredDateIds,
				'ticket'
			);
			ticketsLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntitiesForIds',
				[ 'datetime', filteredDateIds, 'ticket' ]
			);
		} else {
			tickets = getEntitiesForModel( 'ticket' );
			ticketsLoaded = Array.isArray( tickets ) && tickets.length > 0;
		}
		return { tickets, ticketsLoaded };
	}, [ isChained, filteredDateIds ] );
};

export default useTicketsForEventEditorTicketList;
