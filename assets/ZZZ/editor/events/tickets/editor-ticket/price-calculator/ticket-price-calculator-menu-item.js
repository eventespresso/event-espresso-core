/**
 * External imports
 */
import { EspressoIcon, IconMenuItem } from '@eventespresso/components';
import { ifValidTicketEntity, useOpenEditor } from '@eventespresso/editor-hocs';
import { useTicketPrices } from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import { TicketPriceCalculatorFormModal } from './';
import { useTicketPriceCalculatorEditorId } from './hooks';

const TicketPriceCalculatorMenuItem = ( { ticketEntity } ) => {
	const editorId = useTicketPriceCalculatorEditorId( ticketEntity );
	const { prices, pricesLoaded, noBasePrice } = useTicketPrices( ticketEntity );
	const tooltip = noBasePrice ?
		__( 'warning! no ticket price set - click to fix', 'event_espresso' ) :
		__( 'ticket price calculator', 'event_espresso' );
	const calculator = pricesLoaded ? (
		<TicketPriceCalculatorFormModal
			ticketEntity={ ticketEntity }
			pricesLoaded={ pricesLoaded }
			prices={ prices }
		/>
	) : null;
	return (
		<>
			<IconMenuItem
				index={ 2 }
				tooltip={ tooltip }
				id={ `ee-calculate-ticket-price-ticket-${ ticketEntity.id }` }
				htmlClass={ 'ee-calculate-tickets-price' }
				dashicon={ <EspressoIcon icon="calculator" /> }
				tooltipPosition="top right"
				onClick={ useOpenEditor( editorId ) }
				itemCount={ noBasePrice ? 0 : null }
				disabled={ ! pricesLoaded }
			/>
			{ calculator }
		</>
	);
};

TicketPriceCalculatorMenuItem.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
};

export default ifValidTicketEntity( TicketPriceCalculatorMenuItem );
