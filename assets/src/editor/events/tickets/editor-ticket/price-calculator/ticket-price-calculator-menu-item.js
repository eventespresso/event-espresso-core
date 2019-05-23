/**
 * External imports
 */
import { EspressoIcon, IconMenuItem } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import withTicketPriceCalculatorFormModal from './with-ticket-price-calculator-form-modal';

export const TicketPriceCalculatorMenuItem = ( {
	ticket,
	toggleCalculator,
	additionalOnClick = () => null,
	noBasePrice = false,
} ) => {
	const toggle = useCallback( () => {
		additionalOnClick();
		toggleCalculator();
	}, [ toggleCalculator, additionalOnClick ] );
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
			onClick={ toggle }
			itemCount={ noBasePrice ? 0 : null }
		/>
	) : null;
};

export default withTicketPriceCalculatorFormModal( TicketPriceCalculatorMenuItem );
