import React from 'react';
import { parseISO } from 'date-fns';
import classNames from 'classnames';

import { RenderCellProps } from '../../types';
import { getBackgroundColorClassName } from '@sharedEntities/datetimes/helpers';
import { useTimeZoneTime } from '@appServices/hooks';
import { LOCALIZED_DATE_SHORT_FORMAT } from '@appConstants/dateFnsFormats';

const DateCell: React.FC<RenderCellProps> = ({ datetime }) => {
	const bgClassName = getBackgroundColorClassName(datetime);
	const stripeClassName = classNames('date-stripe', bgClassName);

	const { formatForSite: format } = useTimeZoneTime();
	const startDate = format(parseISO(datetime.startDate), LOCALIZED_DATE_SHORT_FORMAT);

	return (
		<div className='date-cell-content'>
			<div className={stripeClassName}></div>
			<div className='ee-focus-priority-8'>ID: {datetime.dbId}</div>
			<div className='ee-focus-priority-5 date-cell-content__name'>{datetime.name}</div>
			<div className='ee-focus-priority-6'>{startDate}</div>
		</div>
	);
};

export default React.memo(DateCell);
