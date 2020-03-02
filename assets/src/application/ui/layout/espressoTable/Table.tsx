import React from 'react';
import classNames from 'classnames';

interface TableProps {
	captionID: string;
	captionText: string;
	children: React.ReactNode;
	tableClassName: string;
	tableId: string;
}

const Table: React.FC<TableProps> = ({
	captionID = '',
	captionText = '',
	children,
	tableClassName = '',
	tableId = '',
	...extraProps
}) => {
	const className = classNames('ee-rspnsv-table', tableClassName);

	return (
		<div role={'region'} aria-labelledby={captionID} className={'ee-rspnsv-table-wrapper'} tabIndex={0}>
			<table id={tableId} className={className} {...extraProps}>
				<caption id={captionID} className={'screen-reader-text'}>
					{captionText}
				</caption>
				{children}
			</table>
		</div>
	);
};

export default Table;
