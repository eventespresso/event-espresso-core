import React from 'react';
import { parseISO } from 'date-fns';
import classNames from 'classnames';

import { RenderCellProps } from '../../types';
import { getBackgroundColorClassName } from '@sharedEntities/datetimes/helpers';
import { useTimeZoneTime } from '@appServices/hooks';
import { blaBlaFormat } from '@appConstants/dateFnsFormats';

const DateCell: React.FC<RenderCellProps> = ({ datetime }) => {
	const bgClassName = getBackgroundColorClassName(datetime);
	const { formatForSite: format } = useTimeZoneTime();
	const stripeClassName = classNames('date-stripe', bgClassName);
	const startDate = format(parseISO(datetime.startDate), blaBlaFormat);

	return (
		<>
			<div className={stripeClassName}></div>
			<div className='ee-focus-priority-8'>ID: {datetime.dbId}</div>
			<div className='ee-focus-priority-6 date-cell__name'>{datetime.name}</div>
			<div className='ee-focus-priority-5'>{startDate}</div>
		</>
	);
};

export default React.memo(DateCell);
