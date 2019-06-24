/**
 * External imports
 */
import { useMemo, useCallback } from '@wordpress/element';
import { reduce, cloneDeep, isEmpty } from 'lodash';
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
	const getMessage = useCallback( ( whichAreEmpty ) => {
		let message;
		const onlyTicketsAreEmpty = whichAreEmpty.dates === 0 && whichAreEmpty.tickets > 0;
		const onlyDatesAreEmpty = whichAreEmpty.dates > 0 && whichAreEmpty.tickets === 0;
		const anyAreEmpty = whichAreEmpty.dates > 0 || whichAreEmpty.tickets > 0;

		switch ( true ) {
			case ( dateEntities.length === 1 && onlyDatesAreEmpty ) ||
			( ticketEntities.length === 1 && onlyDatesAreEmpty ) :
				message = __(
					'Event Dates must always have at least one Ticket assigned to them. If the current assignment is not correct, assign the correct Ticket first, then remove others as required.',
					'event_espresso'
				);
				break;
			case ( ticketEntities.length === 1 && anyAreEmpty ) ||
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

	const isEmptyAssignedState = useCallback(
		() => isEmpty( assignedState.assigned ) && isEmpty( assignedState.removed ),
		[ assignedState ]
	);

	const [ hasNoAssignments, noAssignmentsMessage, updatedAssignmentsCounts ] = useMemo( () => {
		let howManyEmpty = 0;
		const whichAreEmpty = { dates: 0, tickets: 0 };
		const updatedCounts = cloneDeep( assignedCounts );
		// using assignedState (whether its empty or not) to decide whether
		// an initial check can be done to short circuit the more extensive
		// calculations.
		if ( isEmptyAssignedState() ) {
			const countCallback = ( accumulator, count ) => {
				if ( count === 0 ) {
					accumulator++;
				}
				return accumulator;
			};
			whichAreEmpty.dates = reduce( assignedCounts.dates, countCallback, 0 );
			whichAreEmpty.tickets =	reduce( assignedCounts.tickets, countCallback, 0 );
			howManyEmpty = whichAreEmpty.dates + whichAreEmpty.tickets;
		}

		if ( howManyEmpty > 0 ) {
			return [ true, getMessage( whichAreEmpty ), updatedCounts ];
		}

		// still here?  Let's check whether the assignment being added or removed changes things.
		const countCallback = ( assigning ) => ( emptyCount, ticketIds, dateId ) => {
			if ( typeof updatedCounts.dates[ dateId ] === 'undefined' ) {
				updatedCounts.dates[ dateId ] = 0;
			}
			if ( assigning ) {
				ticketIds.forEach( ( ticketId ) => {
					if ( typeof updatedCounts.tickets[ ticketId ] === 'undefined' ) {
						updatedCounts.tickets[ ticketId ] = 0;
					}
					updatedCounts.tickets[ ticketId ]++;
					updatedCounts.dates[ dateId ]++;
				} );
			} else {
				ticketIds.forEach( ( ticketId ) => {
					if ( typeof updatedCounts.tickets[ ticketId ] === 'undefined' ) {
						updatedCounts.tickets[ ticketId ] = 0;
					} else {
						updatedCounts.tickets[ ticketId ]--;
					}
					if ( updatedCounts.tickets[ ticketId ] === 0 ) {
						whichAreEmpty.tickets++;
						emptyCount++;
					}
					updatedCounts.dates[ dateId ]--;
				} );
				if ( updatedCounts.dates[ dateId ] === 0 ) {
					whichAreEmpty.dates++;
					emptyCount++;
				}
			}
			return emptyCount;
		};
		howManyEmpty = reduce( assignedState.assigned, countCallback( true ), howManyEmpty );
		howManyEmpty = reduce( assignedState.removed, countCallback( false ), howManyEmpty );

		if ( howManyEmpty > 0 ) {
			return [ true, getMessage( whichAreEmpty ), updatedCounts ];
		}
		return [ false, '', updatedCounts ];
	}, [ isEmptyAssignedState, assignedCounts ] );
	return [
		hasNoAssignments,
		noAssignmentsMessage,
		updatedAssignmentsCounts,
	];
};

export default useCountsManager;
