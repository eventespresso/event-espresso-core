/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { isModelEntity } from '@eventespresso/validators';

const useEndDateAfterStartDateValidator = ( {
	entity,
	dateProps,
} ) => {
	if ( ! isModelEntity( entity ) ) {
		throw new TypeError(
			'Invalid Entity supplied to useEndDateChangeValidator'
		);
	}
	return useCallback( ( endDate ) => {
		const startDate = entity[ dateProps.start ].toJSDate();
		// Set the time to midnight
		// so as not to disable the same start and end day
		endDate.setHours( 0, 0, 0, 0 );
		startDate.setHours( 0, 0, 0, 0 );
		return endDate - startDate < 0;
	}, [ entity[ dateProps.start ] ] );
};

export default useEndDateAfterStartDateValidator;
