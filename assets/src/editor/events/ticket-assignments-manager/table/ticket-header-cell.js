/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useMemo } from '@wordpress/element';
import { ticketModel } from '@eventespresso/model';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';

/**
 * Internal imports
 */
import { shortenCuid } from '../../../utils';

const { getBackgroundColorClass } = ticketModel;

/**
 * @param {BaseEntity} ticketEntity
 * @return {Array} table header cell data
 */
const TicketHeaderCell = ( { ticketEntity: ticket } ) => useMemo( () => {
	let statusClass = getBackgroundColorClass( ticket );
	statusClass = `ee-tam-ticket-header-status ${ statusClass }`;
	const saleDate = ticket.startDate.toFormat( 'MMM DD YYYY' );
	return (
		<div className="ee-tam-ticket-header-div">
			<div className={ statusClass }>
				<span className="ee-tam-ticket-header-date">
					{ saleDate }
				</span>
			</div>
			<div className="ee-tam-ticket-id">
				{ `#${ shortenCuid( ticket.id ) }` }
			</div>
			<div className="ee-tam-ticket-header-title">
				{ ticket.name }
			</div>
			<div className="ee-tam-ticket-header-price">
				{ `${ ticket.price }` }
				<span className="ee-tam-ticket-header-date">
					{ saleDate }
				</span>
			</div>
		</div>
	);
}, [
	ticket.id,
	ticket.name,
	ticket.price,
	ticket.startDate.toISO(),
	getBackgroundColorClass,
] );

TicketHeaderCell.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
};

export default ifValidTicketEntity( TicketHeaderCell );
