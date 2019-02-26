/**
 * External imports
 */
import { indexOf } from 'lodash';
import { __ } from '@eventespresso/i18n';
import { validations } from '@eventespresso/components';

/**
 * eventDateEntityFormInputs
 * returns an array of inputs corresponding to
 * the properties of the Event Date Entity
 *
 * @function
 * @param {Object} eventDate  EE Date object
 * @param {Array} exclude  Array of field names to not display inputs for
 * @param {Array} currentValues  Array of input values
 * @param {Object} FormInput Input object to use
 * @return {Object} rendered form
 */
export const eventDateEntityFormInputs = (
	eventDate,
	exclude = [],
	currentValues = [],
	FormInput,
) => {
	if ( ! eventDate || ( eventDate && ! eventDate.id ) ) {
		return null;
	}
	const values = currentValues;
	const prefix = 'ee-event-date';
	const dateId = eventDate.id;
	const inputs = [];
	inputs.push(
		<FormInput
			key="id"
			type="number"
			name={ `${ prefix }-id-${ dateId }` }
			initialValue={ values[ `${ prefix }-id-${ dateId }` ] }
			label={ __( 'Date ID', 'event_espresso' ) }
			htmlId={ `${ prefix }-id-${ dateId }` }
			inputWidth={ 3 }
			required
			min={ 0 }
			disabled
		/>,
	);
	if ( indexOf( exclude, 'EVT_ID' ) < 0 ) {
		inputs.push(
			<FormInput
				key="event"
				type="number"
				name={ `${ prefix }-event-id-${ dateId }` }
				initialValue={ values[ `${ prefix }-event-id-${ dateId }` ] || 0 }
				label={ __( 'Event ID', 'event_espresso' ) }
				htmlId={ `${ prefix }-event-id-${ dateId }` }
				inputWidth={ 3 }
				required
				min={ 0 }
				disabled
			/>,
		);
	}
	if ( indexOf( exclude, 'name' ) < 0 ) {
		inputs.push(
			<FormInput
				key="name"
				type="text"
				name={ `${ prefix }-name-${ dateId }` }
				initialValue={ values[ `${ prefix }-name-${ dateId }` ] || '' }
				label={ __( 'Date Label', 'event_espresso' ) }
				htmlId={ `${ prefix }-name-${ dateId }` }
				minLength={ 3 }
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'description' ) < 0 ) {
		inputs.push(
			<FormInput
				key="description"
				type="textarea"
				name={ `${ prefix }-description-${ dateId }` }
				initialValue={ values[ `${ prefix }-description-${ dateId }` ] || '' }
				label={ __( 'Description', 'event_espresso' ) }
				htmlId={ `${ prefix }-description-${ dateId }` }
			/>,
		);
	}
	if ( indexOf( exclude, 'start' ) < 0 ) {
		inputs.push(
			<FormInput
				key="start"
				type="datetime-local"
				name={ `${ prefix }-start-${ dateId }` }
				initialValue={ values[ `${ prefix }-start-${ dateId }` ] }
				label={ __( 'Start Time', 'event_espresso' ) }
				htmlId={ `${ prefix }-start-${ dateId }` }
				validations={ validations.required }
				inputWidth={ 6 }
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'end' ) < 0 ) {
		inputs.push(
			<FormInput
				key="end"
				type="datetime-local"
				name={ `${ prefix }-end-${ dateId }` }
				initialValue={ values[ `${ prefix }-end-${ dateId }` ] }
				label={ __( 'End Time', 'event_espresso' ) }
				htmlId={ `${ prefix }-end-${ dateId }` }
				validations={ validations.required }
				inputWidth={ 6 }
				required
			/>,
		);
	}
	if ( indexOf( exclude, 'regLimit' ) < 0 ) {
		inputs.push(
			<FormInput
				key="regLimit"
				type="number"
				name={ `${ prefix }-reg-limit-${ dateId }` }
				initialValue={ values[ `${ prefix }-reg-limit-${ dateId }` ] || Infinity }
				label={ __( 'Capacity', 'event_espresso' ) }
				htmlId={ `${ prefix }-reg-limit-${ dateId }` }
				helpText={ __(
					'The maximum number of registrants' +
					' that can attend the event at this' +
					' particular date. Leave blank for no limit.',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'sold' ) < 0 ) {
		inputs.push(
			<FormInput
				key="sold"
				type="number"
				name={ `${ prefix }-sold-${ dateId }` }
				initialValue={ values[ `${ prefix }-sold-${ dateId }` ] || 0 }
				label={ __( 'Sold Count', 'event_espresso' ) }
				htmlId={ `${ prefix }-sold-${ dateId }` }
				helpText={ __(
					'Quantity of tickets that have been' +
					' sold for this Date',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'reserved' ) < 0 ) {
		inputs.push(
			<FormInput
				key="reserved"
				type="number"
				name={ `${ prefix }-reserved-${ dateId }` }
				initialValue={ values[ `${ prefix }-reserved-${ dateId }` ] || 0 }
				label={ __( 'Reserved Count', 'event_espresso' ) }
				htmlId={ `${ prefix }-reserved-${ dateId }` }
				helpText={ __(
					'Quantity of tickets reserved,' +
					' but not yet fully purchased',
					'event_espresso',
				) }
				inputWidth={ 3 }
				min={ 0 }
			/>,
		);
	}
	if ( indexOf( exclude, 'isPrimary' ) < 0 ) {
		inputs.push(
			<FormInput
				key="isPrimary"
				type="toggle"
				name={ `${ prefix }-is-primary-${ dateId }` }
				initialValue={ values[ `${ prefix }-is-primary-${ dateId }` ] || false }
				label={ __( 'Is Primary Date', 'event_espresso' ) }
				htmlId={ `${ prefix }-is-primary-${ dateId }` }
				helpTextIfChecked={ __(
					'this is the primary date for this event',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'click to make this the primary date for this event',
					'event_espresso',
				) }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'order' ) < 0 ) {
		inputs.push(
			<FormInput
				key="order"
				type="number"
				name={ `${ prefix }-order-${ dateId }` }
				initialValue={ values[ `${ prefix }-order-${ dateId }` ] || 0 }
				label={ __( 'Display Order', 'event_espresso' ) }
				htmlId={ `${ prefix }-order-${ dateId }` }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'parent' ) < 0 ) {
		inputs.push(
			<FormInput
				key="parent"
				type="text"
				name={ `${ prefix }-parent-${ dateId }` }
				initialValue={ values[ `${ prefix }-parent-${ dateId }` ] || 0 }
				label={ __( 'Parent Date', 'event_espresso' ) }
				htmlId={ `${ prefix }-parent-${ dateId }` }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'deleted' ) < 0 ) {
		inputs.push(
			<FormInput
				key="deleted"
				type="toggle"
				name={ `${ prefix }-deleted-${ dateId }` }
				initialValue={ values[ `${ prefix }-deleted-${ dateId }` ] || false }
				label={ __( 'Archived', 'event_espresso' ) }
				htmlId={ `${ prefix }-deleted-${ dateId }` }
				helpTextIfChecked={ __(
					'this event date is archived',
					'event_espresso',
				) }
				helpTextIfNotChecked={ __(
					'this event date is NOT archived',
					'event_espresso',
				) }
				inputWidth={ 2 }
			/>,
		);
	}
	return inputs;
};
