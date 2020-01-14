/**
 * External imports
 */
import { IconButton } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { __ } from '../../../../../../application/utilities/text';

/**
 * filter for controlling whether Tickets List is chained to the Dates List
 * if true, then only tickets that are related to the dates in the dates list
 * will appear, otherwise ALL tickets will appear (subject to other filters)
 *
 * @param {boolean} isChained
 * @param {Function} toggleIsChained
 * @return {Object} rendered control
 */
const TicketsChainedButton = ({ isChained, toggleIsChained }) => {
	return useMemo(
		() => (
			<IconButton
				label={
					isChained
						? __('showing tickets for above dates only', 'event_espresso')
						: __('showing tickets for all event dates', 'event_espresso')
				}
				icon={isChained ? 'admin-links' : 'editor-unlink'}
				onClick={toggleIsChained}
				value={isChained}
			/>
		),
		[isChained]
	);
};

export default TicketsChainedButton;
