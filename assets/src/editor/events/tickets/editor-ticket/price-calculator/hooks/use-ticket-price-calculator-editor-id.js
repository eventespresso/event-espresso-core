/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

const useTicketPriceCalculatorEditorId = ( ticket ) => useMemo( () => (
	isModelEntityOfModel( ticket, 'ticket' ) ?
		`ticket-price-calculator-editor-${ ticket.id }` :
		''
), [] );

export default useTicketPriceCalculatorEditorId;
