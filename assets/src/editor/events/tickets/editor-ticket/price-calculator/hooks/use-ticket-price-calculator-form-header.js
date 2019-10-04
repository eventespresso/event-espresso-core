/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { currencySignPositionClass } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * ticketPriceCalculatorFormHeader
 *
 * @function
 * @return {Array} form header data
 */
const useTicketPriceCalculatorFormHeader = () => useMemo( () => {
	return {
		type: 'row',
		primary: true,
		key: 'price-header-row',
		class: 'ee-ticket-price-calculator-header-row',
		cells: [
			{
				key: 'id',
				type: 'cell',
				class: 'ee-ticket-price-calculator-id ee-number-column',
				value: __( 'ID', 'event_espresso' ),
			},
			{
				key: 'type',
				type: 'cell',
				class: 'ee-ticket-price-calculator-type',
				value: __( 'Price Type', 'event_espresso' ),
			},
			{
				key: 'name',
				type: 'cell',
				class: 'ee-ticket-price-calculator-name',
				value: __( 'Label', 'event_espresso' ),
			},
			{
				key: 'desc',
				type: 'cell',
				class: 'ee-ticket-price-calculator-desc',
				value: __( 'Description', 'event_espresso' ),
			},
			{
				key: 'amount',
				type: 'cell',
				class: 'ee-ticket-price-calculator-amount ' +
					'ee-number-column ' + currencySignPositionClass(),
				value: __( 'Amount', 'event_espresso' ),
			},
			{
				key: 'actions',
				type: 'cell',
				class: 'ee-ticket-price-calculator-actions',
				value: __( 'Actions', 'event_espresso' ),
			},
		],
	};
} );

export default useTicketPriceCalculatorFormHeader;
