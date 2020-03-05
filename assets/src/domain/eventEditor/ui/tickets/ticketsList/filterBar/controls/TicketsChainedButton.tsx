/**
 * External imports
 */
import React from 'react';
import { LinkOutlined } from '@ant-design/icons';
import { EspressoButton, EspressoButtonType, Icon } from '@application/ui/input/EspressoButton';
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
	const tooltip = isChained
		? __('tickets list is linked to dates list and is showing tickets for above dates only')
		: __('tickets list is unlinked and is showing tickets for all event dates');
	const className = isChained
		? 'ee-filter-bar-filter ee-active-filters ee-ticket-list-is-chained'
		: 'ee-filter-bar-filter ee-ticket-list-not-chained';
	const icon = isChained ? Icon.LINK : Icon.UNLINK;
	return (
		<>
			<label className='esprs-button-label screen-reader-text' htmlFor={'ee-ticket-list-filter-bar-is-chained'}>
				{__('Only Show Tickets for Dates Above')}
			</label>
			<EspressoButton
				buttonType={EspressoButtonType.MINIMAL}
				className={className}
				icon={icon}
				id={'ee-ticket-list-filter-bar-is-chained'}
				onClick={toggleIsChained}
				tooltip={tooltip}
			/>
		</>
	);
};

export default TicketsChainedButton;
