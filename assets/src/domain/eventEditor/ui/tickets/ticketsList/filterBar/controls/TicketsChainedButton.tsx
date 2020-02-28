/**
 * External imports
 */
import React from 'react';
import { LinkOutlined } from '@ant-design/icons';
import EspressoButton from '@appInputs/EspressoButton';
import { __ } from '@wordpress/i18n';

interface TicketsChainedButtonProps {
	isChained?: boolean;
	toggleIsChained: () => void;
}

/**
 * filter for controlling whether Tickets List is chained to the Dates List
 * if true, then only tickets that are related to the dates in the dates list
 * will appear, otherwise ALL tickets will appear (subject to other filters)
 */
const TicketsChainedButton: React.FC<TicketsChainedButtonProps> = ({ isChained, toggleIsChained }) => {
	const tooltip = isChained ? __('showing tickets for above dates only') : __('showing tickets for all event dates');
	return (
		<>
			<label className='esprs-button-label screen-reader-text' htmlFor={'ee-ticket-list-filter-bar-is-chained'}>
				{__('Only Show Tickets for Dates Above')}
			</label>
			<EspressoButton
				id={'ee-ticket-list-filter-bar-is-chained'}
				className={
					isChained
						? 'ee-filter-bar-filter ee-active-filters ee-ticket-list-is-chained'
						: 'ee-filter-bar-filter ee-ticket-list-not-chained'
				}
				icon={<LinkOutlined />}
				tooltip={tooltip}
				onClick={toggleIsChained}
			/>
		</>
	);
};

export default TicketsChainedButton;
