/**
 * External imports
 */
import { indexOf } from 'lodash';
import { __ } from '@eventespresso/i18n';

/**
 * eventDateEntityFormInputs
 * returns an array of inputs corresponding to
 * the properties of the Event Date Entity
 *
 * @function
 * @param {Object} eventDate  EE Date object
 * @param {Array} exclude  Array of field names to not display inputs for
 * @param {Array} initialValues  Array of input values
 * @param {Object} FormInput Input object to use
 * @return {Object} rendered form
 */
const eventDateEntityFormInputs = (
	eventDate,
	exclude = [],
	initialValues = [],
	FormInput,
) => {
	// console.log( 'EventDateEntityFormInputs eventDate', eventDate );
	// console.log( 'EventDateEntityFormInputs initialValues', initialValues );
	// console.log( 'EventDateEntityFormInputs exclude', exclude );
	const inputs = [];
	if ( indexOf( exclude, 'DTT_ID' ) < 0 ) {
		inputs.push(
			<FormInput
				key="id"
				type="number"
				name={
					`ee-event-date-id-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-id-${ eventDate.id }` ]
				}
				label={ __( 'Date ID',
					'event_espresso',
				) }
				htmlId={
					`ee-event-date-id-${ eventDate.id }`
				}
				// validators={ [
				// 	validations.isInteger,
				// 	validations.minNumber( 0 ),
				// ] }
				inputWidth={ 2 }
				required
				min={ 0 }
				disabled
			/>
		);
	}
	if ( indexOf( exclude, 'EVT_ID' ) < 0 ) {
		inputs.push(
			<FormInput
				key="event"
				type="number"
				name={
					`ee-event-date-event-id-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-event-id-${ eventDate.id }` ]
				}
				label={
					__( 'Event ID', 'event_espresso' )
				}
				htmlId={
					`ee-event-date-event-id-${ eventDate.id }`
				}
				// validators={ [
				// 	validations.isInteger,
				// 	validations.minNumber( 0 ),
				// ] }
				inputWidth={ 2 }
				required
				min={ 0 }
				disabled
			/>
		);
	}
	if ( indexOf( exclude, 'name' ) < 0 ) {
		inputs.push(
			<FormInput
				key="name"
				type="text"
				name={
					`ee-event-date-name-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-name-${ eventDate.id }` ]
				}
				label={
					__( 'Date Label', 'event_espresso' )
				}
				htmlId={
					`ee-event-date-name-${ eventDate.id }`
				}
				minLength={ 3 }
				required
			/>
		);
	}
	if ( indexOf( exclude, 'description' ) < 0 ) {
		inputs.push(
			<FormInput
				key="description"
				type="textarea"
				name={
					`ee-event-date-description-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-description-${ eventDate.id }` ]
				}
				label={
					__( 'Description', 'event_espresso' )
				}
				htmlId={
					`ee-event-date-description-${ eventDate.id }`
				}
			/>
		);
	}
	if ( indexOf( exclude, 'start' ) < 0 ) {
		inputs.push(
			<FormInput
				key="start"
				type="datetime-local"
				name={
					`ee-event-date-start-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-start-${ eventDate.id }` ]
				}
				label={
					__( 'Start Time', 'event_espresso' )
				}
				htmlId={
					`ee-event-date-start-${ eventDate.id }`
				}
				// validations={ validations.required }
				inputWidth={ 6 }
				required
			/>
		);
	}
	if ( indexOf( exclude, 'end' ) < 0 ) {
		inputs.push(
			<FormInput
				key="end"
				type="datetime-local"
				name={
					`ee-event-date-end-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-end-${ eventDate.id }` ]
				}
				label={ __( 'End Time', 'event_espresso' ) }
				htmlId={
					`ee-event-date-end-${ eventDate.id }`
				}
				// validations={ validations.required }
				inputWidth={ 6 }
				required
			/>
		);
	}
	if ( indexOf( exclude, 'regLimit' ) < 0 ) {
		inputs.push(
			<FormInput
				key="regLimit"
				type="number"
				name={
					`ee-event-date-reg-limit-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-reg-limit-${ eventDate.id }` ]
				}
				label={ __( 'Capacity', 'event_espresso' ) }
				htmlId={
					`ee-event-date-reg-limit-${ eventDate.id }`
				}
				helpText={ __(
					'The maximum number of registrants' +
					' that can attend the event at this' +
					' particular date',
					'event_espresso'
				) }
				// validators={ [
				// 	validations.isInteger,
				// 	validations.minNumber( 0 ),
				// ] }
				inputWidth={ 3 }
				min={ 0 }
			/>
		);
	}
	if ( indexOf( exclude, 'sold' ) < 0 ) {
		inputs.push(
			<FormInput
				key="sold"
				type="number"
				name={
					`ee-event-date-sold-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-sold-${ eventDate.id }` ]
				}
				label={
					__( 'Sold Count', 'event_espresso' )
				}
				htmlId={
					`ee-event-date-sold-${ eventDate.id }`
				}
				helpText={ __(
					'Quantity of tickets that have been' +
					' sold for this Date',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>
		);
	}
	if ( indexOf( exclude, 'reserved' ) < 0 ) {
		inputs.push(
			<FormInput
				key="reserved"
				type="number"
				name={
					`ee-event-date-reserved-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-reserved-${ eventDate.id }` ]
				}
				label={ __( 'Reserved Count',
					'event_espresso',
				) }
				htmlId={
					`ee-event-date-reserved-${ eventDate.id }`
				}
				helpText={ __(
					'Quantity of tickets reserved,' +
					' but not yet fully purchased',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>
		);
	}
	if ( indexOf( exclude, 'isPrimary' ) < 0 ) {
		inputs.push(
			<FormInput
				key="isPrimary"
				type="toggle"
				name={
					`ee-event-date-is-primary-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-is-primary-${ eventDate.id }` ]
				}
				label={ __( 'Is Primary Date',
					'event_espresso',
				) }
				htmlId={
					`ee-event-date-is-primary-${ eventDate.id }`
				}
				helpTextIfChecked={ __(
					'this is the primary date for this event',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'this is NOT the primary date for this event',
					'event_espresso',
				) }
				inputWidth={ 2 }
			/>
		);
	}
	if ( indexOf( exclude, 'order' ) < 0 ) {
		inputs.push(
			<FormInput
				key="order"
				type="number"
				name={
					`ee-event-date-order-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-order-${ eventDate.id }` ]
				}
				label={
					__( 'Display Order', 'event_espresso' )
				}
				htmlId={
					`ee-event-date-order-${ eventDate.id }`
				}
				inputWidth={ 2 }
			/>
		);
	}
	if ( indexOf( exclude, 'parent' ) < 0 ) {
		inputs.push(
			<FormInput
				key="parent"
				type="text"
				name={
					`ee-event-date-parent-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-parent-${ eventDate.id }` ]
				}
				label={
					__( 'Parent Date', 'event_espresso' )
				}
				htmlId={
					`ee-event-date-parent-${ eventDate.id }`
				}
				// validators={ [
				// 	validations.isInteger,
				// 	validations.minNumber( 0 ),
				// ] }
				inputWidth={ 2 }
			/>
		);
	}
	if ( indexOf( exclude, 'deleted' ) < 0 ) {
		inputs.push(
			<FormInput
				key="deleted"
				type="toggle"
				name={
					`ee-event-date-deleted-${ eventDate.id }`
				}
				initialValue={
					initialValues[ `ee-event-date-deleted-${ eventDate.id }` ]
				}
				label={ __( 'Archived', 'event_espresso' ) }
				htmlId={
					`ee-event-date-deleted-${ eventDate.id }`
				}
				helpTextIfChecked={ __(
					'this event date is archived',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'this event date is NOT archived',
					'event_espresso',
				) }
				inputWidth={ 2 }
			/>
		);
	}
	// console.log( 'EventDateEntityFormInputs inputs', inputs );
	return inputs;
};

export default eventDateEntityFormInputs;
