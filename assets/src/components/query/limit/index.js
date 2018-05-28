/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';

/**
 * WordPress dependencies
 **/
const { RangeControl } = wp.components;

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 100;

export const QueryLimit = ( {
	limit = 10,
	label = __( 'Limit', 'event_espresso' ),
	min = DEFAULT_MIN,
	max = DEFAULT_MAX,
	onLimitChange
} ) => {
	return onLimitChange && (
		<RangeControl
			key="query-limit"
			value={ limit }
			label={ label }
			min={ min }
			max={ max }
			onChange={ onLimitChange }
		/>
	)
};