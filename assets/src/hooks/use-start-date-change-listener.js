/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { getServerDateTime } from '@eventespresso/utils';
import { ServerDateTime, Duration } from '@eventespresso/value-objects';
import { isModelEntity } from '@eventespresso/validators';

/**
 * Verifies that start dates occur before end dates for entity date pairs.
 * If not, updates the end date accordingly using the same offset
 * currently existing between the previous start and end dates
 *
 * @function
 * @param {Object} props
 * @member {Object} entity
 * @member {Object} dateProps
 * @member {string} startDateFormKey identifier for React Final Form data schema
 * @member {string} endDateFormKey identifier for React Final Form data schema
 * @member {Function} updateField callback for editing a field
 * @member {Function} touchField callback for marking field as changed
 * @return {Object} entityStartDate & entityEndDate
 */
const useStartDateChangeListener = ( {
	entity,
	dateProps,
	startDateFormKey,
	endDateFormKey,
	updateField,
	touchField,
} ) => {
	if ( ! isModelEntity( entity ) ) {
		throw new TypeError(
			'Invalid Entity supplied to useStartDateChangeListener'
		);
	}
	return useCallback( ( newDateValue, prevDateValue ) => {
		if ( newDateValue && newDateValue !== prevDateValue ) {
			const newDate = getServerDateTime( newDateValue );
			if ( newDate instanceof ServerDateTime ) {
				// does the new start date occur AFTER the existing end date?
				if ( newDate > entity[ dateProps.end ] ) {
					const originalDuration = entity[ dateProps.end ].diff(
						entity[ dateProps.start ]
					);
					if ( Duration.isValidDuration( originalDuration ) ) {
						// add original date difference to new start date.
						const newEndDate = newDate.plus( originalDuration );
						entity[ dateProps.end ] = newEndDate;
						updateField(
							endDateFormKey,
							newEndDate.toISO( false )
						);
					}
				}
				// and finally update the start date
				entity[ dateProps.start ] = newDate;
			}
			// let RFF know these fields have potentially changed
			touchField( startDateFormKey );
			touchField( endDateFormKey );
		}
	}, [
		entity[ dateProps.start ],
		entity[ dateProps.end ],
		startDateFormKey,
		endDateFormKey,
		updateField,
		touchField,
	] );
};

export default useStartDateChangeListener;
