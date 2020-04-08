import React from 'react';
import { parseISO } from 'date-fns';
import classNames from 'classnames';

import { getBackgroundColorClassName } from '@sharedEntities/tickets/helpers';
import { RenderCellProps } from '../../types';
import { useMoneyDisplay } from '@appServices/utilities/money';
import { useTimeZoneTime } from '@appServices/hooks';

const HeaderCell: React.FC<RenderCellProps> = ({ ticket }) => {
	const bgClassName = getBackgroundColorClassName(ticket);
	const { currency } = useMoneyDisplay();
	const { formatForSite: format } = useTimeZoneTime();
	const startDate = format(parseISO(ticket.startDate), 'MMM dd yyyy');
	const startDateClassName = classNames(bgClassName, 'header-cell-after-content');

	return (
		<>
			<div className='header-cell-content'>
				<div className='ee-focus-priority-8'>ID: {ticket.dbId}</div>
				<div className='ee-focus-priority-5 date-cell-content__name'>{ticket.name}</div>
				<div className='ee-focus-priority-8'>{`${currency.sign} ${ticket.price}`}</div>
			</div>
			<div className={startDateClassName}>{startDate}</div>
		</>
	);
};

export default React.memo(HeaderCell);
