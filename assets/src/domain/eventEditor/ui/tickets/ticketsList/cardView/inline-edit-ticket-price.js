/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useCallback, useMemo } from '@wordpress/element';
import { InlineEditInput } from '@eventespresso/components';
import { usePriceTypes, useTicketPrices } from '@eventespresso/hooks';
import { __ } from '@eventespresso/i18n';
import { parseMoneyValue } from '@eventespresso/utils';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import useTicketBasePriceCalculator from '../../../../../../../ZZZ/editor/events/tickets/editor-ticket/price-calculator/hooks/use-ticket-base-price-calculator';
import { useBasePrice } from '../../../../../../../ZZZ/editor/events/tickets/editor-ticket/price-calculator/hooks';

/**
 * InlineEditTicketPrice inline-edit-ticket-price
 *
 * @function
 * @param {BaseEntity} ticket JSON object defining the ticket
 * @param {boolean} showPrice
 * @param {string} wrapperElement
 * @return {Object} ticket price
 */
const InlineEditTicketPrice = ({ ticket, showPrice, wrapperElement }) => {
	const { prices } = useTicketPrices(ticket);
	const { priceTypes } = usePriceTypes();
	const calculateTicketBasePrice = useTicketBasePriceCalculator(prices, priceTypes);
	const ticketPriceAmount = ticket.price.amount.toNumber();

	const basePrice = useBasePrice(prices);
	const updateTicketPrice = useCallback(
		(amount) => {
			amount = parseMoneyValue(amount);
			ticket.price = new Money(amount, SiteCurrency);
			const basePriceValue = calculateTicketBasePrice(amount);
			basePrice.amount = new Money(parseMoneyValue(basePriceValue), SiteCurrency);
			return amount;
		},
		[calculateTicketBasePrice]
	);
	const WrapperElement = wrapperElement ? wrapperElement : 'h2';
	return useMemo(
		() =>
			showPrice ? (
				<WrapperElement className='ee-ticket-price'>
					<InlineEditInput
						htmlId={`ee-editor-ticket-price-${ticket.id}`}
						type='text'
						value={ticketPriceAmount}
						onChange={(amount) => {
							return updateTicketPrice(amount);
						}}
						label={__('Ticket Price', 'event_espresso')}
						valueFormatter={ticket.price.formatter.formatMoney}
						formatterSettings={ticket.price.formatter.settings}
					/>
				</WrapperElement>
			) : null,
		[ticket.id, ticket.price.formatter.settings, ticketPriceAmount, updateTicketPrice, showPrice, WrapperElement]
	);
};

InlineEditTicketPrice.propTypes = {
	ticket: PropTypes.object.isRequired,
	showPrice: PropTypes.bool,
	wrapperElement: PropTypes.string,
};

InlineEditTicketPrice.defaultProps = {
	showPrice: false,
};

export default InlineEditTicketPrice;
