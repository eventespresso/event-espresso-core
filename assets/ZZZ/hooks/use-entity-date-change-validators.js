/**
 * External imports
 */
import { useCallback } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { getServerDateTime } from '@eventespresso/utils';
import { isModelEntity } from '@eventespresso/validators';

const useEndDateChangeValidator = ( {
	entity,
	dateProps,
} ) => {
	if ( ! isModelEntity( entity ) ) {
		throw new TypeError(
			'Invalid Entity supplied to useEndDateChangeValidator'
		);
	}
	return useCallback( ( newDateValue ) => {
		if ( newDateValue ) {
			const endDate = getServerDateTime( newDateValue );
			if ( endDate < entity[ dateProps.start ] ) {
				return __(
					'End Date & Time must be set later than the Start Date & Time',
					'event_espresso'
				);
			}
		}
	}, [] );
};
const useStartDateChangeValidator = ( {
	entity,
	dateProps,
} ) => {
	if ( ! isModelEntity( entity ) ) {
		throw new TypeError(
			'Invalid Entity supplied to useStartDateChangeValidator'
		);
	}
	return useCallback( ( newDateValue ) => {
		if ( newDateValue ) {
			const startDate = getServerDateTime( newDateValue );
			if ( startDate > entity[ dateProps.end ] ) {
				return __(
					'End Date & Time must be set later than the Start Date & Time',
					'event_espresso'
				);
			}
		}
	}, [] );
};

const useEntityDateChangeValidators = ( props ) => {
	return {
		startDateChangeValidator: useStartDateChangeValidator( props ),
		endDateChangeValidator: useEndDateChangeValidator( props ),
	};
};

export default useEntityDateChangeValidators;
