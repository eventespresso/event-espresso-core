import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonType, Icon } from '@application/ui/input/EspressoButton';

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
	const className = classNames('ee-filter-bar__btn', {
		'ee-filter-bar__btn--active': isChained,
	});

	const icon = isChained ? Icon.LINK : Icon.UNLINK;
	const tooltip = isChained
		? __('tickets list is linked to dates list and is showing tickets for above dates only')
		: __('tickets list is unlinked and is showing tickets for all event dates');

	return (
		<>
			<label className='esprs-button-label screen-reader-text'>{__('Only Show Tickets for Dates Above')}</label>
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
