/**
 * External imports
 */
import React from 'react';
import { IconButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

interface TicketsChainedButtonProps {
	isChained?: boolean;
	toggleIsChained: () => void;
}

/**
 * filter for controlling whether Tickets List is chained to the Dates List
 * if true, then only tickets that are related to the dates in the dates list
 * will appear, otherwise ALL tickets will appear (subject to other filters)
 *
 * @param {boolean} isChained
 * @param {Function} toggleIsChained
 * @return {Object} rendered control
 */
const TicketsChainedButton: React.FC<TicketsChainedButtonProps> = ({ isChained, toggleIsChained }): JSX.Element => {
	return (
		<IconButton
			label={
				isChained
					? __('showing tickets for above dates only', 'event_espresso')
					: __('showing tickets for all event dates', 'event_espresso')
			}
			icon={isChained ? 'admin-links' : 'editor-unlink'}
			onClick={toggleIsChained}
		/>
	);
};

export default TicketsChainedButton;
