import React from 'react';
import classNames from 'classnames';

import { Box } from '@infraUI/display';
import { TableProps } from './types';

const Table: React.FC<TableProps> = ({ captionID = '', captionText = '', children, tableId = '', ...props }) => {
	const className = classNames('ee-rspnsv-table', props.className);
	const tableProps: React.HTMLAttributes<HTMLElement> = {
		...props,
		className,
		id: tableId,
	};

	return (
		<Box
			aria-labelledby={captionID}
			className='ee-rspnsv-table-wrapper'
			overflowX={{ sm: 'auto', md: 'visible' }}
			role='region'
			tabIndex={0}
		>
			<table {...tableProps}>
				<caption id={captionID} className={'screen-reader-text'}>
					{captionText}
				</caption>
				{children}
			</table>
		</Box>
	);
};

export default Table;
