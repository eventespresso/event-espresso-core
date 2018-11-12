/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';

/**
 * WordPress dependencies
 **/
import { RangeControl } from '@wordpress/components';

const DEFAULT_LIMIT = 10;
const DEFAULT_LABEL = __( 'Limit', 'event_espresso' );
const DEFAULT_MIN = 1;
const DEFAULT_MAX = 1000;

export const QueryLimit = ( {
	onLimitChange,
	limit = DEFAULT_LIMIT,
	label = DEFAULT_LABEL,
	min = DEFAULT_MIN,
	max = DEFAULT_MAX,
	...rest
} ) => {
	return (
		<RangeControl
			key={ 'query-limit' }
			value={ limit }
			label={ label }
			min={ min }
			max={ max }
			onChange={ onLimitChange }
			{ ...rest }
		/>
	);
};
