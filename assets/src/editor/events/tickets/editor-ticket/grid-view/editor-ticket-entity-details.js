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
import { withPriceTypeEntities } from '../../data/with-price-type-entities';
import { withTicketPriceEntities } from '../../data/with-ticket-price-entities';
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
	ticketEntity,
	showDesc = 'excerpt',
	showPrice = true,
	priceTypeEntities,
	priceEntities,
	refreshed,
} ) => {
	// @todo I tried making prices a dependency on the updateTicketPrice hook but for
	// some reason prices never gets updated, so for now using a ref will catch
	// the change in the prices. For future refactor, might want to try and move
	// prices state up.
	const currentPrices = useRef( priceEntities );
	useEffect( () => {
		currentPrices.current = priceEntities;
	}, [ priceEntities ] );
	const { calculateTicketBasePrice } = useTicketPriceCalculators( priceTypeEntities );
	const ticketName = useMemo(
		() => {
			const htmlClass = ticketEntity.name && ticketEntity.name.length > 40 ?
				'ee-editor-ticket-name-heading ee-long-title' :
				'ee-editor-ticket-name-heading';
			return (
				<h1 className={ htmlClass }>
					<InlineEditInput
						htmlId={ `editor-ticket-name-${ ticketEntity.id }` }
						type="text"
						value={ ticketEntity.name }
						onChange={ ( name ) => {
							ticketEntity.name = name;
						} }
						label={ __( 'Ticket Name', 'event_espresso' ) }
					/>
				</h1>
			);
		},
		[ ticketEntity, refreshed ]
	);

	const ticketDescription = useMemo( () => {
		const htmlClass = showDesc === 'excerpt' ?
			'ee-editor-ticket-desc-div ee-ticket-desc-excerpt' :
			'ee-editor-ticket-desc-div';
		return (
			<div className={ htmlClass }>
				<InlineEditInput
					htmlId={ `editor-ticket-desc-${ ticketEntity.id }` }
					type="textarea"
					value={ ticketEntity.description }
					onChange={ ( description ) => {
						ticketEntity.description = description;
					} }
					label={ __( 'Ticket Description', 'event_espresso' ) }
				/>
			</div>
		);
	}, [ ticketEntity, showDesc, refreshed ] );

	const updateTicketPrice = useCallback(
		( price ) => {
			ticketEntity.price = new Money( price, SiteCurrency );
			calculateTicketBasePrice( price, currentPrices.current, true );
		},
		[ ticketEntity, refreshed ]
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
							htmlId={ `editor-ticket-price-${ ticketEntity.id }` }
							type="text"
							value={ ticketEntity.price.amount.toNumber() }
							onChange={ ( price ) => {
								updateTicketPrice( price );
							} }
							label={ __( 'Ticket Price', 'event_espresso' ) }
							valueFormatter={ ticketEntity.price.formatter.formatMoney }
							formatterSettings={ ticketEntity.price.formatter.settings }
						/>
					</h2>
				) :
				'';
		},
		[ ticketEntity, showPrice, updateTicketPrice ]
	);

	/**
	 * ticketSoldReservedCapacity
	 *
	 * @function
	 * @param {Object} ticketEntity    JSON object defining the ticket
	 * @return {string}    ticket details
	 */
	const ticketSoldReservedCapacity = useMemo(
		() => {
			const details = [
				{
					id: 'ticket-sold',
					label: __( 'sold', 'event_espresso' ),
					value: ticketEntity.sold,
				},
				{
					id: 'ticket-reserved',
					label: __( 'reserved', 'event_espresso' ),
					value: ticketEntity.reserved,
				},
				{
					id: 'ticket-qty',
					label: __( 'quantity', 'event_espresso' ),
					value: ticketEntity.qty || Infinity,
					editable: {
						type: 'text',
						valueType: 'number',
						onChange: ( qty ) => {
							ticketEntity.qty = parseInt( qty, 10 );
						},
					},
				},
				{
					id: 'ticket-registrants',
					label: __( 'registrants', 'event_espresso' ),
					value: ticketEntity.sold,
				},
			];
			return <EntityDetailsPanel
				details={ details }
				htmlClass="ee-editor-ticket-details-sold-rsrvd-qty-div"
			/>;
		},
		[ ticketEntity, refreshed ]
	);

	return isModelEntityOfModel( ticketEntity, TICKET ) ? (
		<div className={ 'ee-editor-ticket-details-wrapper-div' }>
			{ ticketName }
			{ ticketPrice }
			{ ticketDescription }
			{ ticketSoldReservedCapacity }
		</div>
	) : null;
};

export default compose( [
	withPriceTypeEntities,
	withTicketPriceEntities,
] )( EditorTicketDetails );
