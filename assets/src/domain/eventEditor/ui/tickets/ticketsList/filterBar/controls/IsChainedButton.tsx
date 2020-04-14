import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { IconButton } from '@application/ui/input';
import { Link, Unlink } from '@appDisplay/Icons';
import { getPropsAreEqual } from '@appServices/utilities';
import { TicketsFilterStateManager } from '@edtrServices/filterState';

type IsChainedButtonProps = Pick<TicketsFilterStateManager, 'isChained' | 'toggleIsChained'>;

/**
 * filter for controlling whether Tickets List is chained to the Dates List
 * if true, then only tickets that are related to the dates in the dates list
 * will appear, otherwise ALL tickets will appear (subject to other filters)
 */
const IsChainedButton: React.FC<IsChainedButtonProps> = ({ isChained, toggleIsChained }) => {
	const className = classNames('ee-filter-bar__btn ee-filter-bar__chain', {
		'ee-filter-bar__btn--active': isChained,
		'ee-filter-bar__chain--active': isChained,
	});
	const icon = isChained ? Link : Unlink;
	const tooltip = isChained
		? __('tickets list is linked to dates list and is showing tickets for above dates only')
		: __('tickets list is unlinked and is showing tickets for all event dates');

	return (
		<IconButton
			className={className}
			icon={icon}
			id={'ee-ticket-list-filter-bar-is-chained'}
			label={__('link')}
			onClick={toggleIsChained}
			tooltip={tooltip}
			showTooltipOnMobile
			variant='outline'
		/>
	);
};

export default React.memo(IsChainedButton, getPropsAreEqual(['isChained']));
