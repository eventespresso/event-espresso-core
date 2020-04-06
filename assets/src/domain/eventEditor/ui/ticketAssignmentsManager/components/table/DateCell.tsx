import React from 'react';
import classNames from 'classnames';

import { RenderCellProps } from '../../types';
import { getBackgroundColorClassName } from '@sharedEntities/datetimes/helpers';

const DateCell: React.FC<RenderCellProps> = ({ datetime }) => {
	const bgClassName = getBackgroundColorClassName(datetime);
	const stripeClassName = classNames('date-stripe', bgClassName);

	return (
		<>
			<div className={stripeClassName}></div>
			{`${datetime.dbId}: ${datetime.name}`}
		</>
	);
};

export default React.memo(DateCell);
