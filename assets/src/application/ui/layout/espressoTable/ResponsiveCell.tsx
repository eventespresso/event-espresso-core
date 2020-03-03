import React from 'react';

import { ResponsiveCellProps } from './types';

const ResponsiveCell: React.FC<ResponsiveCellProps> = ({ heading, value }) => (
	<>
		<div aria-hidden className={'ee-rspnsv-table-mobile-only-column-header'}>
			{heading}
		</div>
		<div className={'ee-rspnsv-table-mobile-only-column-value'}>{value}</div>
	</>
);

export default ResponsiveCell;
