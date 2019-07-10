/**
 * External imports
 */
import { compose } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';
import { EspressoIcon, IconMenuItem } from '@eventespresso/components';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';
import { __ } from '@eventespresso/i18n';
import { flow } from 'lodash';

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
	return (
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
	);
};

export default compose( [
	ifValidTicketEntity,
	withTicketPriceCalculatorFormModal,
] )( TicketPriceCalculatorMenuItem );
