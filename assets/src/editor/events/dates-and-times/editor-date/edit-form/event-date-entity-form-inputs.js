/**
 * External imports
 */
import { indexOf } from 'lodash';
import { __ } from '@eventespresso/i18n';
import { validations } from '@eventespresso/components';
import { dateTimeModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';

const { MODEL_NAME: DATETIME } = dateTimeModel;

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
	const inputs = [];
	if ( ! isModelEntityOfModel( eventDate, DATETIME ) ) {
		return inputs;
	}
	const values = currentValues;
	const prefix = `ee-event-date-${ eventDate.id }`;
	if ( parseInt( eventDate.id ) && indexOf( exclude, 'DTT_ID' ) < 0 ) {
		inputs.push(
			<FormInput
				key="id"
				type="number"
				name={ `${ prefix }-id` }
				initialValue={ values[ `${ prefix }-id` ] }
				label={ __( 'Date ID', 'event_espresso' ) }
				htmlId={ `${ prefix }-id` }
				inputWidth={ 3 }
				required
				min={ 0 }
				disabled
			/>,
		);
	}
	if ( indexOf( exclude, 'EVT_ID' ) < 0 ) {
		inputs.push(
			<FormInput
				key="event"
				type="number"
				name={ `${ prefix }-event-id` }
				initialValue={ values[ `${ prefix }-event-id` ] || 0 }
				label={ __( 'Event ID', 'event_espresso' ) }
				htmlId={ `${ prefix }-event-id` }
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
				name={ `${ prefix }-name` }
				initialValue={ values[ `${ prefix }-name` ] || '' }
				label={ __( 'Date Label', 'event_espresso' ) }
				htmlId={ `${ prefix }-name` }
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
				name={ `${ prefix }-description` }
				initialValue={ values[ `${ prefix }-description` ] || '' }
				label={ __( 'Description', 'event_espresso' ) }
				htmlId={ `${ prefix }-description` }
			/>,
		);
	}
	if ( indexOf( exclude, 'start' ) < 0 ) {
		inputs.push(
			<FormInput
				key="start"
				type="datetime-local"
				name={ `${ prefix }-start` }
				initialValue={ values[ `${ prefix }-start` ] }
				label={ __( 'Start Time', 'event_espresso' ) }
				htmlId={ `${ prefix }-start` }
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
				name={ `${ prefix }-end` }
				initialValue={ values[ `${ prefix }-end` ] }
				label={ __( 'End Time', 'event_espresso' ) }
				htmlId={ `${ prefix }-end` }
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
				name={ `${ prefix }-reg-limit` }
				initialValue={ values[ `${ prefix }-reg-limit` ] || Infinity }
				label={ __( 'Capacity', 'event_espresso' ) }
				htmlId={ `${ prefix }-reg-limit` }
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
				name={ `${ prefix }-sold` }
				initialValue={ values[ `${ prefix }-sold` ] || 0 }
				label={ __( 'Sold Count', 'event_espresso' ) }
				htmlId={ `${ prefix }-sold` }
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
				name={ `${ prefix }-reserved` }
				initialValue={ values[ `${ prefix }-reserved` ] || 0 }
				label={ __( 'Reserved Count', 'event_espresso' ) }
				htmlId={ `${ prefix }-reserved` }
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
	if ( indexOf( exclude, 'order' ) < 0 ) {
		inputs.push(
			<FormInput
				key="order"
				type="number"
				name={ `${ prefix }-order` }
				initialValue={ values[ `${ prefix }-order` ] || 0 }
				label={ __( 'Display Order', 'event_espresso' ) }
				htmlId={ `${ prefix }-order` }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'parent' ) < 0 ) {
		inputs.push(
			<FormInput
				key="parent"
				type="text"
				name={ `${ prefix }-parent` }
				initialValue={ values[ `${ prefix }-parent` ] || 0 }
				label={ __( 'Parent Date', 'event_espresso' ) }
				htmlId={ `${ prefix }-parent` }
				inputWidth={ 2 }
			/>,
		);
	}
	if ( indexOf( exclude, 'deleted' ) < 0 ) {
		inputs.push(
			<FormInput
				key="deleted"
				type="toggle"
				name={ `${ prefix }-deleted` }
				initialValue={ values[ `${ prefix }-deleted` ] || false }
				label={ __( 'Archived', 'event_espresso' ) }
				htmlId={ `${ prefix }-deleted` }
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
