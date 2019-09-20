/**
 * External imports
 */
import warning from 'warning';
import { useMemo } from '@wordpress/element';
import { __, sprintf } from '@eventespresso/i18n';
import { validations } from '@eventespresso/components';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { ServerDateTime as DateTime, Duration } from '@eventespresso/value-objects';

const useDateEntityInputConfig = ( dateEntity ) => useMemo( () => {
	warning(
		isModelEntityOfModel( dateEntity, 'datetime' ),
		'Can not generate input config data because an invalid date entity was supplied.'
	);
	const now = new DateTime();
	return [
		{
			id: 'id',
			label: __( 'Date ID', 'event_espresso' ),
			default: false,
			disabled: true,
			inputWidth: 3,
			required: true,
			validations: validations.required,
		},
		{
			id: 'eventId',
			label: __( 'Event ID', 'event_espresso' ),
			default: false,
			disabled: true,
			inputWidth: 3,
			required: true,
			validations: validations.required,
		},
		{
			id: 'name',
			label: __( 'Date Label', 'event_espresso' ),
			default: '',
			changeListener: ( value ) => {
				dateEntity.name = value;
			},
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
			default: now.plus( Duration.fromObject( { days: 30 } ) ),
			changeListener: ( value, prevValue ) => {
				if ( value !== prevValue ) {
					const newDate = new Date( value );
					if (
						newDate instanceof Date &&
						! isNaN( newDate.getTime() )
					) {
						dateEntity.start = DateTime.fromJSDate( newDate );

						const endDate = dateEntity.end.toJSDate();

						if ( endDate - newDate < 0 ) {
							// add 2 days to the end date.
							endDate.setDate( endDate.getDate() + 2 );

							dateEntity.end = DateTime.fromJSDate( endDate );
						}
					}
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
			default: now.plus( Duration.fromObject( { days: 60 } ) ),
			changeListener: ( value, prevValue ) => {
				if ( value !== prevValue ) {
					const newDate = new Date( value );
					if (
						newDate instanceof Date &&
						! isNaN( newDate.getTime() )
					) {
						dateEntity.end = DateTime.fromJSDate( newDate );
					}
				}
			},
			validate: ( value ) => {
				if ( value ) {
					const endDate = new Date( value );
					const startDate = dateEntity.start.toJSDate();
					if ( endDate - startDate < 0 ) {
						return __( 'End time must be after start time.', 'event_espresso' );
					}
				}
			},
			isInvalidDate: ( endDate ) => {
				const startDate = dateEntity.start.toJSDate();
				// Set the time to midnight
				// so as not to disable the same start and end day
				endDate.setHours( 0, 0, 0, 0 );
				startDate.setHours( 0, 0, 0, 0 );

				return endDate - startDate < 0;
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
}, [
	dateEntity.id,
	dateEntity.EVT_ID,
	dateEntity.name,
	dateEntity.description,
	dateEntity.start.toISO(),
	dateEntity.end.toISO(),
	dateEntity.regLimit,
	dateEntity.sold,
	dateEntity.reserved,
	dateEntity.order,
	dateEntity.parent,
	dateEntity.deleted,
] );

export default useDateEntityInputConfig;
