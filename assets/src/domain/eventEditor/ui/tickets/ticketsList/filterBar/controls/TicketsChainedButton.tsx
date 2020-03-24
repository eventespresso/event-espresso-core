import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { BaseInput, EspressoButton, EspressoButtonType, Icon } from '@application/ui/input';

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
	const className = classNames('ee-filter-bar__btn ee-filter-bar__chain', {
		'ee-filter-bar__btn--active': isChained,
		'ee-filter-bar__chain--active': isChained,
	});

	const icon = isChained ? Icon.LINK : Icon.UNLINK;
	const label = __('link');
	const tooltip = isChained
		? __('tickets list is linked to dates list and is showing tickets for above dates only')
		: __('tickets list is unlinked and is showing tickets for all event dates');

	return (
		<BaseInput label={label}>
			<EspressoButton
				buttonType={EspressoButtonType.MINIMAL}
				className={className}
				icon={icon}
				id={'ee-ticket-list-filter-bar-is-chained'}
				onClick={toggleIsChained}
				tooltip={tooltip}
			/>
		</BaseInput>
	);
};

export default TicketsChainedButton;
