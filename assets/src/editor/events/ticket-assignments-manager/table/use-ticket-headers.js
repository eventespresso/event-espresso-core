/**
 * External imports
 */
import PropTypes from 'prop-types';
import warning from 'warning';
import { useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import TicketHeaderCell from './ticket-header-cell';

/**
 * @param {number} dateCount
 * @param {BaseEntity[]} ticketEntities
 * @return {Array} table header cell data
 */
const useTicketHeaders = ( { dateCount, ticketEntities } ) => useMemo(
	() => {
		const headerCells = [ {
			type: 'row',
			class: '',
			value: '',
		} ];
		if ( dateCount > 1 ) {
			headerCells.push( {
				type: 'cell',
				class: 'ee-tam-dates-header',
				value: '',
			} );
		}
		ticketEntities.forEach( ( ticket ) => {
			warning(
				isModelEntityOfModel( ticket, 'ticket' ),
				'Invalid EE Ticket model object!'
			);
			headerCells.push( {
				type: 'cell',
				class: 'ee-tam-ticket-header',
				value: <TicketHeaderCell ticketEntity={ ticket } />,
			} );
		} );
		return headerCells;
	},
	[ ticketEntities, dateCount ]
);

useTicketHeaders.propTypes = {
	dateCount: PropTypes.number.isRequired,
	ticketEntities: PropTypes.arrayOf(
		PropTypes.object
	).isRequired,
};

export default useTicketHeaders;
