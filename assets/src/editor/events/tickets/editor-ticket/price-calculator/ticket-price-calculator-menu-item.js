/**
 * External imports
 */
import { EspressoIcon, IconMenuItem } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { flow } from 'lodash';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { useCallback } from '@wordpress/element';

/**
 * Internal imports
 */
import withTicketPriceCalculatorFormModal from './with-ticket-price-calculator-form-modal';

export const TicketPriceCalculatorMenuItem = ( {
	ticketEntity,
	toggleCalculator = () => null,
	onOpenTicketCalculator = () => null,
	onCloseTicketCalculator = () => null,
	showCalculator,
	noBasePrice = false,
} ) => {
	const toggle = useCallback( () => {
		const toggleAction = showCalculator ?
			flow( toggleCalculator, onCloseTicketCalculator ) :
			flow( onOpenTicketCalculator, toggleCalculator );
		toggleAction();
	}, [
		toggleCalculator,
		showCalculator,
		onOpenTicketCalculator,
		onCloseTicketCalculator,
	] );
	const tooltip = noBasePrice ?
		__( 'warning! no ticket price set - click to fix', 'event_espresso' ) :
		__( 'ticket price calculator', 'event_espresso' );
	return isModelEntityOfModel( ticketEntity, 'ticket' ) ? (
		<IconMenuItem
			index={ 2 }
			tooltip={ tooltip }
			id={ `ee-calculate-ticket-price-ticket-${ ticketEntity.id }` }
			htmlClass={ 'ee-calculate-tickets-price' }
			dashicon={ <EspressoIcon icon="calculator" /> }
			tooltipPosition="top right"
			onClick={ toggle }
			itemCount={ noBasePrice ? 0 : null }
		/>
	) : null;
};

export default withTicketPriceCalculatorFormModal( TicketPriceCalculatorMenuItem );
