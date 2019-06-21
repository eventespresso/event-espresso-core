/**
 * External imports
 */
import { useRef, useMemo, useCallback } from '@wordpress/element';
import { reduce } from 'lodash';
import { __ } from '@eventespresso/i18n';

// @todo, when the wp.data.useSelect hook is available, we can utilize that in
// this custom hook and then we'll be able to remove the withSelect hoc usage
// in the composed `TicketAssignmentsManagerModal` component.

const useCountsManager = (
	dateEntities,
	ticketEntities,
	assignedCounts,
	assignedState,
) => {
	const whichAreEmpty = useRef( { dates: 0, tickets: 0 } );

	const getMessage = useCallback( () => {
		let message;
		const onlyTicketsAreEmpty = whichAreEmpty.dates === 0 && whichAreEmpty.tickets > 0;
		const onlyDatesAreEmpty = whichAreEmpty.dates > 0 && whichAreEmpty.tickets === 0;

		switch ( true ) {
			case ( dateEntities.length === 1 && onlyDatesAreEmpty ) ||
			( ticketEntities.length === 1 && onlyDatesAreEmpty ) :
				message = __(
					'Event Dates must always have at least one Ticket assigned to them. If the current assignment is not correct, assign the correct Ticket first, then remove others as required.',
					'event_espresso'
				);
				break;
			case ( ticketEntities.length === 1 && onlyTicketsAreEmpty ) ||
			( dateEntities.length === 1 && onlyTicketsAreEmpty ) :
				message = __(
					'Tickets must always have at least one Event Date assigned to them. If the current assignment is not correct, assign the correct Event Date first, then remove others as required.',
					'event_espresso'
				);
				break;
			default:
				message = __(
					'Event Dates must always have at least one Ticket assigned to them but one or more of the Event Dates below does not have any. Please correct the assignments for the highlighted cells.',
					'event_espresso'
				);
		}
		return message;
	}, [ dateEntities, ticketEntities ] );

	const [ hasNoAssignments, noAssignmentsMessage ] = useMemo( () => {
		let howManyEmpty = 0;
		// first let's see if any of the current counts are 0 (but only not
		// already toggled as empty)!
		if ( ( whichAreEmpty.current.dates + whichAreEmpty.current.tickets ) === 0 ) {
			const countCallback = ( accumulator, count ) => {
				if ( count === 0 ) {
					accumulator++;
				}
				return accumulator;
			};
			whichAreEmpty.current.dates = reduce( assignedCounts.dates, countCallback, 0 );
			whichAreEmpty.current.tickets =	reduce( assignedCounts.tickets, countCallback, 0 );
			howManyEmpty = whichAreEmpty.current.dates + whichAreEmpty.current.tickets;
		}

		if ( howManyEmpty > 0 ) {
			return [ true, getMessage() ];
		}

		// still here?  Let's check whether the assignment being added or removed changes things.
		const countCallback = ( assigning ) => ( emptyCount, ticketIds, dateId ) => {
			if ( assigning ) {
				ticketIds.forEach( ( ticketId ) => {
					if ( assignedCounts.tickets[ ticketId ] === 0 ) {
						whichAreEmpty.current.tickets--;
						emptyCount--;
					}
				} );
				if ( assignedCounts.dates[ dateId ] === 0 ) {
					whichAreEmpty.current.dates--;
					emptyCount--;
				}
			} else {
				ticketIds.forEach( ( ticketId ) => {
					if ( assignedCounts.tickets[ ticketId ] - 1 === 0 ) {
						whichAreEmpty.current.tickets++;
						emptyCount++;
					}
				} );
				if ( assignedCounts.dates[ dateId ] - 1 === 0 ) {
					whichAreEmpty.current.dates++;
					emptyCount++;
				}
			}
			return emptyCount;
		};
		howManyEmpty = reduce( assignedState.assigned, countCallback( true ), howManyEmpty );
		howManyEmpty = reduce( assignedState.removed, countCallback( false ), howManyEmpty );

		if ( howManyEmpty > 0 ) {
			return [ true, getMessage() ];
		}
		return [ false, '' ];
	}, [ assignedState, assignedCounts.dates, assignedCounts.tickets ] );
	return [
		hasNoAssignments,
		noAssignmentsMessage,
	];
};

export default useCountsManager;
