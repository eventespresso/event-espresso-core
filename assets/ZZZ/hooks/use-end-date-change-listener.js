/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { getServerDateTime } from '@eventespresso/utils';
import { ServerDateTime } from '@eventespresso/value-objects';
import { isModelEntity } from '@eventespresso/validators';

/**
 * Verifies that end date value has changed and updates entity accordingly.
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
const useEndDateChangeListener = ( {
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
				entity[ dateProps.end ] = newDate;
			}
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

export default useEndDateChangeListener;
