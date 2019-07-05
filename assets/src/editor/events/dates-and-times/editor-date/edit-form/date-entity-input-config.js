/**
 * External imports
 */
import warning from 'warning';
import { __, sprintf } from '@eventespresso/i18n';
import { validations } from '@eventespresso/components';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { ServerDateTime as DateTime } from '@eventespresso/value-objects';

export const dateEntityInputConfig = ( dateEntity ) => {
	warning(
		isModelEntityOfModel( dateEntity, 'datetime' ),
		'Can not generate input config data because an invalid date entity was supplied.'
	);
	return [
		{
			id: 'id',
			label: __( 'Date ID', 'event_espresso' ),
			default: false,
			required: true,
			disabled: true,
			inputWidth: 3,
		},
		{
			id: 'eventId',
			label: __( 'Event ID', 'event_espresso' ),
			default: false,
			required: true,
			disabled: true,
			inputWidth: 3,
		},
		{
			id: 'name',
			label: __( 'Date Label', 'event_espresso' ),
			default: '',
			changeListener: ( value ) => {
				dateEntity.name = value;
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
				dateEntity.description = value;
			},
		},
		{
			id: 'start',
			type: 'datetime-local',
			label: __( 'Start Date & Time', 'event_espresso' ),
			changeListener: ( value, prevValue ) => {
				if ( value !== prevValue ) {
					dateEntity.start = new DateTime( value );
				}
			},
			validations: validations.required,
			required: true,
			inputWidth: 6,
		},
		{
			id: 'end',
			type: 'datetime-local',
			label: __( 'End Date & Time', 'event_espresso' ),
			changeListener: ( value, prevValue ) => {
				if ( value !== prevValue ) {
					dateEntity.end = new DateTime( value );
				}
			},
			validations: validations.required,
			required: true,
			inputWidth: 6,
		},
		{
			id: 'regLimit',
			type: 'number',
			label: __( 'Capacity', 'event_espresso' ),
			default: -1,
			changeListener: ( value ) => {
				dateEntity.regLimit = parseInt( value || -1, 10 );
			},
			min: -1,
			inputWidth: 3,
			helpText: {
				regular: sprintf(
					__(
						'The maximum number of registrants that can attend the event at this particular date.%sSet to 0 to close registration or set to -1 for no limit.',
						'event_espresso',
					),
					'\n'
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
				dateEntity.sold = parseInt( value || 0, 10 );
			},
			min: 0,
			inputWidth: 3,
			helpText: {
				regular: __(
					'Quantity of tickets that have been sold for this Date',
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
				dateEntity.reserved = parseInt( value || 0, 10 );
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
			disabled: true,
			default: 0,
			changeListener: ( value ) => {
				dateEntity.order = parseInt( value || 0, 10 );
			},
			inputWidth: 2,
		},
		{
			id: 'parent',
			label: __( 'Parent Date', 'event_espresso' ),
			disabled: true,
			default: 0,
			changeListener: ( value ) => {
				dateEntity.parent = parseInt( value || 0, 10 );
			},
			inputWidth: 2,
		},
		{
			id: 'deleted',
			type: 'toggle',
			label: __( 'Archived', 'event_espresso' ),
			default: false,
			changeListener: ( value ) => {
				dateEntity.deleted = parseInt( value || 0, 10 ) === 1;
			},
			inputWidth: 2,
			helpText: {
				ifChecked: __(
					'this event date is archived',
					'event_espresso',
				),
				ifNotChecked: __(
					'this event date is NOT archived',
					'event_espresso',
				),
			},
		},
	];
};
