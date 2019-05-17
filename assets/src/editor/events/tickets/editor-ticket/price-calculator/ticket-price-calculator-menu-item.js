/**
 * External imports
 */
import { EspressoIcon, IconMenuItem } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';
import withTicketPriceCalculatorFormModal from './with-ticket-price-calculator-form-modal';

/**
 * @function ticketPriceCalculatorMenuItem
 * @param {Object} ticket JSON object defining the Ticket
 * @param {Function} toggleCalculator
 * @param {boolean} noBasePrice
 * @return {IconMenuItem}    View Tickets for Ticket IconMenuItem
 */
export const TicketPriceCalculatorMenuItem = ( {
	ticket,
	toggleCalculator,
	noBasePrice = false,
} ) => {
	const tooltip = noBasePrice ?
		__( 'warning! no ticket price set - click to fix', 'event_espresso' ) :
		__( 'ticket price calculator', 'event_espresso' );
	return isModelEntityOfModel( ticket, 'ticket' ) ? (
		<IconMenuItem
			index={ 2 }
			tooltip={ tooltip }
			id={ `calculate-ticket-price-ticket-${ ticket.id }` }
			htmlClass={ 'calculate-tickets-price' }
			dashicon={ <EspressoIcon icon="calculator" /> }
			tooltipPosition="top right"
			onClick={ toggleCalculator }
			itemCount={ noBasePrice ? 0 : null }
		/>
	) : null;
};

export default withTicketPriceCalculatorFormModal( TicketPriceCalculatorMenuItem );
