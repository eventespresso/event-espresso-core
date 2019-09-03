/**
 * External imports
 */
import warning from 'warning';
import { useCallback, useMemo } from '@wordpress/element';
import { __, sprintf } from '@eventespresso/i18n';
import { validations } from '@eventespresso/components';
import { isModelEntityOfModel } from '@eventespresso/validators';
import {
	ServerDateTime as DateTime,
	Money,
	SiteCurrency,
} from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import { TicketPriceCalculatorMenuItem } from '../price-calculator';
import { useTicketBasePriceCalculator } from '../price-calculator/hooks';
import { amountsMatch } from '../price-calculator/utils/';
import { usePriceTypes, useTicketPrices } from '../../../hooks/';

/**
 * @function
 * @param {BaseEntity} ticket
 * @return {Array} array of ticket form input config objects
 */
const useTicketFormInputConfig = ( ticket ) => {
	warning(
		isModelEntityOfModel( ticket, 'ticket' ),
		'Can not generate input config data because an invalid ticket entity was supplied.'
	);
	const { prices } = useTicketPrices( ticket );
	const { priceTypes } = usePriceTypes();
	const calculateTicketBasePrice = useTicketBasePriceCalculator(
		prices,
		priceTypes
	);
	const recalculateBasePrice = useCallback( ( t ) => {
		const ticketPriceAmount = t.price.amount.toNumber();
		calculateTicketBasePrice( ticketPriceAmount );
	}, [ ticket, prices, calculateTicketBasePrice ] );

	const calculator = (
		<TicketPriceCalculatorMenuItem ticketEntity={ ticket } />
	);

	return useMemo( () => [
		{
			id: 'id',
			label: __( 'Ticket ID', 'event_espresso' ),
			default: false,
			required: true,
			disabled: true,
			inputWidth: 3,
		},
		{
			id: 'name',
			label: __( 'Ticket Label', 'event_espresso' ),
			default: '',
			changeListener: ( value ) => {
				ticket.name = value;
			},
			required: true,
			minLength: 3,
		},
		{
			id: 'description',
			type: 'textarea',
			label: __( 'Description', 'event_espresso' ),
			default: '',
			changeListener: ( value ) => {
				ticket.description = value;
			},
		},
		{
			id: 'price',
			type: 'number',
			label: __( 'Ticket Price', 'event_espresso' ),
			default: 0,
			min: 0,
			step: 0.01,
			changeListener: ( value, prevValue ) => {
				if ( ! amountsMatch( value, prevValue ) ) {
					ticket.price = new Money(
						value || 0,
						SiteCurrency
					);
					recalculateBasePrice();
				}
			},
			helpText: {
				regular: sprintf(
					__(
						'The amount of money charged for this ticket. Leave blank to make this ticket selection free.%sClick the button after the input to use the Ticket Price Calculator (warning: will close this edit form)',
						'event_espresso'
					),
					' \n'
				),
			},
			inputWidth: 3,
			afterInput: calculator,
		},
		{
			id: 'taxable',
			type: 'toggle',
			label: __( 'Ticket is Taxable?', 'event_espresso' ),
			default: false,
			changeListener: ( value ) => {
				ticket.taxable = !! value;
			},
			inputWidth: 2,
			helpText: {
				ifChecked: __(
					'This ticket is taxable. All configured taxes will be applied to the price of this ticket upon purchase.',
					'event_espresso',
				),
				ifNotChecked: __(
					'click to make this ticket taxable',
					'event_espresso',
				),
			},
		},
		{
			id: 'startDate',
			type: 'datetime-local',
			label: __( 'Ticket Sales Start', 'event_espresso' ),
			changeListener: ( value, prevValue ) => {
				if ( value !== prevValue ) {
					ticket.startDate = new DateTime( value );
				}
			},
			validations: validations.required,
			required: true,
			inputWidth: 6,
		},
		{
			id: 'endDate',
			type: 'datetime-local',
			label: __( 'Ticket Sales End', 'event_espresso' ),
			changeListener: ( value, prevValue ) => {
				if ( value !== prevValue ) {
					ticket.endDate = new DateTime( value );
				}
			},
			validations: validations.required,
			required: true,
			inputWidth: 6,
		},
		{
			id: 'qty',
			type: 'number',
			label: __( 'Quantity', 'event_espresso' ),
			default: -1,
			changeListener: ( value ) => {
				ticket.qty = parseInt( value || -1, 10 );
			},
			min: -1,
			inputWidth: 3,
			helpText: {
				regular: sprintf(
					__(
						'The maximum number of this ticket available for sale.%sSet to 0 stop sales or set to -1 for no limit.',
						'event_espresso',
					),
					'\n'
				),
			},
		},
		{
			id: 'min',
			type: 'number',
			label: __( 'Minimum Quantity', 'event_espresso' ),
			default: null,
			min: 0,
			changeListener: ( value ) => {
				ticket.min = parseInt( value || 0, 10 );
			},
			inputWidth: 3,
			helpText: {
				regular: sprintf(
					__(
						'The minimum quantity that can be selected for this ticket. Use this to create ticket bundles or graduated pricing.%sLeave blank for no minimum.',
						'event_espresso',
					),
					'\n'
				),
			},
		},
		{
			id: 'max',
			type: 'number',
			label: __( 'Maximum Quantity', 'event_espresso' ),
			default: -1,
			min: -1,
			changeListener: ( value ) => {
				ticket.max = parseInt( value || 0, 10 );
			},
			inputWidth: 3,
			helpText: {
				regular: sprintf(
					__(
						'The maximum quantity that can be selected for this ticket. Use this to create ticket bundles or graduated pricing.%sSet to -1 for no maximum.',
						'event_espresso',
					),
					'\n'
				),
			},
		},
		{
			id: 'uses',
			type: 'number',
			label: __( 'Number of Uses', 'event_espresso' ),
			default: -1,
			min: 0,
			changeListener: ( value ) => {
				ticket.uses = parseInt( value || 0, 10 );
			},
			inputWidth: 3,
			helpText: {
				regular: sprintf(
					__(
						'Controls the total number of times this ticket can be used, regardless of the number of dates it is assigned to.%sExample: A ticket might have access to 4 different dates, but setting this field to 2 would mean that the ticket could only be used twice. Leave blank for no limit.',
						'event_espresso',
					),
					'\n'
				),
			},
		},
		{
			id: 'required',
			type: 'toggle',
			label: __( 'Required Ticket?', 'event_espresso' ),
			default: false,
			changeListener: ( value ) => {
				ticket.required = !! value;
			},
			inputWidth: 2,
			helpText: {
				ifChecked: __(
					'This ticket is required and must be purchased. It will appear first in frontend ticket lists.',
					'event_espresso',
				),
				ifNotChecked: __(
					'click to make this ticket a required selection.',
					'event_espresso',
				),
			},
		},
		{
			id: 'sold',
			type: 'number',
			label: __( 'Sold Count', 'event_espresso' ),
			disabled: true,
			default: 0,
			changeListener: ( value ) => {
				ticket.sold = parseInt( value || 0, 10 );
			},
			min: 0,
			inputWidth: 3,
			helpText: {
				regular: __(
					'Quantity of this Ticket that has been sold.',
					'event_espresso',
				),
			},
		},
		{
			id: 'reserved',
			type: 'number',
			label: __( 'Reserved Count', 'event_espresso' ),
			disabled: true,
			default: 0,
			changeListener: ( value ) => {
				ticket.reserved = parseInt( value || 0, 10 );
			},
			min: 0,
			inputWidth: 3,
			helpText: {
				regular: __(
					'Quantity of tickets reserved, but not yet fully purchased',
					'event_espresso',
				),
			},
		},
		{
			id: 'order',
			type: 'number',
			label: __( 'Display Order', 'event_espresso' ),
			default: 0,
			changeListener: ( value ) => {
				ticket.order = parseInt( value || 0, 10 );
			},
			inputWidth: 2,
		},
		{
			id: 'isDefault',
			type: 'toggle',
			label: __( 'Default Ticket?', 'event_espresso' ),
			default: false,
			changeListener: ( value ) => {
				ticket.isDefault = !! value;
			},
			inputWidth: 2,
			helpText: {
				ifChecked: __(
					'this is a default ticket and will appear on all new events.',
					'event_espresso',
				),
				ifNotChecked: __(
					'click to make this a default ticket for any new events.',
					'event_espresso',
				),
			},
		},
		{
			id: 'reverseCalculate',
			type: 'toggle',
			label: __( 'Reverse Calculate?', 'event_espresso' ),
			default: false,
			changeListener: ( value ) => {
				ticket.reverse_calculate = !! value;
			},
			inputWidth: 2,
			helpText: {
				ifChecked: __(
					'the ticket base price will be reverse engineered from the provided ticket total and price modifiers.',
					'event_espresso',
				),
				ifNotChecked: __(
					'the ticket total will be calculated normally from the provided ticket base price and price modifiers. click to reverse calculate the ticket base price from the total instead.',
					'event_espresso',
				),
			},
		},
		{
			id: 'wpUser',
			type: 'number',
			label: __( 'Created By', 'event_espresso' ),
			default: 0,
			disabled: true,
			changeListener: ( value ) => {
				ticket.wpUser = parseInt( value || 0, 10 );
			},
			inputWidth: 2,
			helpText: {
				regular: __(
					'The ID of the admin that created this ticket.',
					'event_espresso',
				),
			},
		},
		{
			id: 'parent',
			label: __( 'Parent Ticket', 'event_espresso' ),
			default: 0,
			disabled: true,
			changeListener: ( value ) => {
				ticket.parent = parseInt( value || 0, 10 );
			},
			inputWidth: 2,
		},
		{
			id: 'deleted',
			type: 'toggle',
			label: __( 'Archived', 'event_espresso' ),
			default: false,
			changeListener: ( value ) => {
				ticket.deleted = parseInt( value || 0, 10 ) === 1;
			},
			inputWidth: 2,
			helpText: {
				ifChecked: __( 'this ticket is archived', 'event_espresso' ),
				ifNotChecked: __(
					'this ticket is NOT archived',
					'event_espresso',
				),
			},
		},
	], [
		ticket.id,
		ticket.name,
		ticket.description,
		ticket.startDate.toISO(),
		ticket.endDate.toISO(),
		ticket.qty,
		ticket.sold,
		ticket.reserved,
		ticket.uses,
		ticket.required,
		ticket.min,
		ticket.max,
		ticket.price.amount.toNumber(),
		ticket.taxable,
		ticket.isDefault,
		ticket.reverse_calculate,
		ticket.wpUser,
		ticket.order,
		ticket.parent,
		ticket.deleted,
	] );
};

export default useTicketFormInputConfig;
