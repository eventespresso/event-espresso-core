/**
 * External imports
 */
import { useMemo, useCallback } from '@wordpress/element';
import { InlineEditInput } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import useTicketPriceCalculators from
	'../price-calculator/use-ticket-price-calculators';
import { useTicketPrices } from '../../../hooks';

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
	const priceEntities = useTicketPrices( ticket );
	const { calculateTicketBasePrice } = useTicketPriceCalculators();
	const ticketPriceAmount = ticket.price.amount.toNumber();

	const updateTicketPrice = useCallback(
		( amount ) => {
			ticket.price = new Money( amount, SiteCurrency );
			calculateTicketBasePrice( amount, priceEntities );
		},
		[ ticketPriceAmount, calculateTicketBasePrice, priceEntities ]
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
