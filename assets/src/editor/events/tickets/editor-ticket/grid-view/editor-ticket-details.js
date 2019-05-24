/**
 * External imports
 */
import { useMemo, useCallback, useEffect, useRef } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { EntityDetailsPanel, InlineEditInput } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { ticketModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import { withPriceTypes } from '../../data/with-price-types';
import { withTicketPrices } from '../../data/with-ticket-prices';
import useTicketPriceCalculators from '../price-calculator/use-ticket-price-calculators';

const { MODEL_NAME: TICKET } = ticketModel;

/**
 * EditorTicketDetails
 *
 * @function
 * @param {Object} eventTicket    JSON object defining the Event Ticket
 * @return {string}    ticket details
 */
const EditorTicketDetails = ( {
	ticket,
	showDesc = 'excerpt',
	showPrice = true,
	priceTypes,
	prices,
	refreshed,
} ) => {
	// @todo I tried making prices a dependency on the updateTicketPrice hook but for
	// some reason prices never gets updated, so for now using a ref will catch
	// the change in the prices. For future refactor, might want to try and move
	// prices state up.
	const currentPrices = useRef( prices );
	useEffect( () => {
		currentPrices.current = prices;
	}, [ prices ] );
	const { calculateTicketBasePrice } = useTicketPriceCalculators( priceTypes );
	const ticketName = useMemo(
		() => {
			const htmlClass = ticket.name && ticket.name.length > 40 ?
				'ee-editor-ticket-name-heading ee-long-title' :
				'ee-editor-ticket-name-heading';
			return (
				<h1 className={ htmlClass }>
					<InlineEditInput
						htmlId={ `editor-ticket-name-${ ticket.id }` }
						type="text"
						value={ ticket.name }
						onChange={ ( name ) => {
							ticket.name = name;
						} }
						label={ __( 'Ticket Name', 'event_espresso' ) }
					/>
				</h1>
			);
		},
		[ ticket, refreshed ]
	);

	const ticketDescription = useMemo( () => {
		const htmlClass = showDesc === 'excerpt' ?
			'ee-editor-ticket-desc-div ee-ticket-desc-excerpt' :
			'ee-editor-ticket-desc-div';
		return (
			<div className={ htmlClass }>
				<InlineEditInput
					htmlId={ `editor-ticket-desc-${ ticket.id }` }
					type="textarea"
					value={ ticket.description }
					onChange={ ( description ) => {
						ticket.description = description;
					} }
					label={ __( 'Ticket Description', 'event_espresso' ) }
				/>
			</div>
		);
	}, [ ticket, showDesc, refreshed ] );

	const updateTicketPrice = useCallback(
		( price ) => {
			ticket.price = new Money( price, SiteCurrency );
			calculateTicketBasePrice( price, currentPrices.current, true );
		},
		[ ticket, refreshed ]
	);

	/**
	 * ticketPrice
	 *
	 * @function
	 * @param {Object} ticket JSON object defining the ticket
	 * @param {boolean} showPrice
	 * @return {string}    ticket price
	 */
	const ticketPrice = useMemo(
		() => {
			return showPrice ?
				(
					<h2 className="ee-ticket-price">
						<InlineEditInput
							htmlId={ `editor-ticket-price-${ ticket.id }` }
							type="text"
							value={ ticket.price.amount.toNumber() }
							onChange={ ( price ) => {
								updateTicketPrice( price );
							} }
							label={ __( 'Ticket Price', 'event_espresso' ) }
							valueFormatter={ ticket.price.formatter.formatMoney }
							formatterSettings={ ticket.price.formatter.settings }
						/>
					</h2>
				) :
				'';
		},
		[ ticket, showPrice, updateTicketPrice ]
	);

	/**
	 * ticketSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} ticket    JSON object defining the ticket
	 * @return {string}    ticket details
	 */
	const ticketSoldReservedCapacity = useMemo(
		() => {
			const details = [
				{
					id: 'ticket-sold',
					label: __( 'sold', 'event_espresso' ),
					value: ticket.sold,
				},
				{
					id: 'ticket-reserved',
					label: __( 'reserved', 'event_espresso' ),
					value: ticket.reserved,
				},
				{
					id: 'ticket-qty',
					label: __( 'quantity', 'event_espresso' ),
					value: ticket.qty || Infinity,
					editable: {
						type: 'text',
						valueType: 'number',
						onChange: ( qty ) => {
							ticket.qty = parseInt( qty, 10 );
						},
					},
				},
				{
					id: 'ticket-registrants',
					label: __( 'registrants', 'event_espresso' ),
					value: ticket.sold,
				},
			];
			return <EntityDetailsPanel
				details={ details }
				htmlClass="ee-editor-ticket-details-sold-rsrvd-qty-div"
			/>;
		},
		[ ticket, refreshed ]
	);

	return isModelEntityOfModel( ticket, TICKET ) ? (
		<div className={ 'ee-editor-ticket-details-wrapper-div' }>
			{ ticketName }
			{ ticketPrice }
			{ ticketDescription }
			{ ticketSoldReservedCapacity }
		</div>
	) : null;
};

export default compose( [
	withPriceTypes,
	withTicketPrices,
] )( EditorTicketDetails );
