/**
 * External imports
 */
import { useMemo, useCallback } from '@wordpress/element';
import { InlineEditInput } from '@eventespresso/components';
import { usePriceTypes, useTicketPrices } from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import useTicketBasePriceCalculator from
	'../price-calculator/hooks/use-ticket-base-price-calculator';

/**
 * InlineEditTicketPrice inline-edit-ticket-price
 *
 * @function
 * @param {BaseEntity} ticket JSON object defining the ticket
 * @param {boolean} showPrice
 * @param {string} wrapperElement
 * @return {Object} ticket price
 */
const InlineEditTicketPrice = ( {
	ticket,
	showPrice,
	wrapperElement,
} ) => {
	const { prices } = useTicketPrices( ticket );
	const { priceTypes } = usePriceTypes();
	const calculateTicketBasePrice = useTicketBasePriceCalculator(
		prices,
		priceTypes
	);
	const ticketPriceAmount = ticket.price.amount.toNumber();

	const updateTicketPrice = useCallback(
		( amount ) => {
			ticket.price = new Money( amount, SiteCurrency );
			calculateTicketBasePrice( amount );
		},
		[ ticketPriceAmount, calculateTicketBasePrice, prices ]
	);
	const WrapperElement = wrapperElement ? wrapperElement : 'h2';
	return useMemo( () => showPrice ? (
		<WrapperElement className="ee-ticket-price">
			<InlineEditInput
				htmlId={
					`ee-editor-ticket-price-${ ticket.id }`
				}
				type="text"
				value={ ticketPriceAmount }
				onChange={ ( amount ) => {
					updateTicketPrice( amount );
					return amount;
				} }
				label={ __( 'Ticket Price', 'event_espresso' ) }
				valueFormatter={
					ticket.price.formatter.formatMoney
				}
				formatterSettings={
					ticket.price.formatter.settings
				}
			/>
		</WrapperElement>
	) : null, [
		ticket.id,
		ticket.price.formatter.settings,
		ticketPriceAmount,
		updateTicketPrice,
		showPrice,
		WrapperElement,
	] );
};

export default InlineEditTicketPrice;
