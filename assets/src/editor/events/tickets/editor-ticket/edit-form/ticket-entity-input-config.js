/**
 * External imports
 */
import warning from 'warning';
import { __, sprintf } from '@eventespresso/i18n';
import { validations } from '@eventespresso/components';
import { isModelEntityOfModel } from '@eventespresso/validators';
import {
	ServerDateTime as DateTime,
	Money,
	SiteCurrency,
} from '@eventespresso/value-objects';

const ticketEntityInputConfig = (
	ticketEntity,
	calculator,
	recalculateBasePrice
) => {
	warning(
		isModelEntityOfModel( ticketEntity, 'ticket' ),
		'Can not generate input config data because an invalid ticket entity was supplied.'
	);
	return [
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
				ticketEntity.name = value;
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
				ticketEntity.description = value;
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
				if ( value !== prevValue ) {
					ticketEntity.price = new Money(
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
				ticketEntity.taxable = !! value;
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
					ticketEntity.startDate = new DateTime( value );
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
					ticketEntity.endDate = new DateTime( value );
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
				ticketEntity.qty = parseInt( value || -1, 10 );
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
				ticketEntity.min = parseInt( value || 0, 10 );
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
				ticketEntity.max = parseInt( value || 0, 10 );
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
				ticketEntity.uses = parseInt( value || 0, 10 );
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
				ticketEntity.required = !! value;
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
				ticketEntity.sold = parseInt( value || 0, 10 );
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
				ticketEntity.reserved = parseInt( value || 0, 10 );
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
				ticketEntity.order = parseInt( value || 0, 10 );
			},
			inputWidth: 2,
		},
		{
			id: 'isDefault',
			type: 'toggle',
			label: __( 'Default Ticket?', 'event_espresso' ),
			default: false,
			changeListener: ( value ) => {
				ticketEntity.isDefault = !! value;
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
			id: 'wpUser',
			type: 'number',
			label: __( 'Created By', 'event_espresso' ),
			default: 0,
			disabled: true,
			changeListener: ( value ) => {
				ticketEntity.wpUser = parseInt( value || 0, 10 );
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
				ticketEntity.parent = parseInt( value || 0, 10 );
			},
			inputWidth: 2,
		},
		{
			id: 'deleted',
			type: 'toggle',
			label: __( 'Archived', 'event_espresso' ),
			default: false,
			changeListener: ( value ) => {
				ticketEntity.deleted = parseInt( value || 0, 10 ) === 1;
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
	];
};

export default ticketEntityInputConfig;
