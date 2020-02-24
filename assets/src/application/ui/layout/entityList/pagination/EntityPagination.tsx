import React from 'react';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

import './style.scss';

/**
 * Adds pagination to an "EntityList" component
 * @return EntityPagination
 */
const EntityPagination = ({
	onChange,
	pageSize = 6,
	pageSizeOptions = ['6', '12', '24', '48'],
	showTotal,
	total,
	...rest
}: PaginationProps) => {
	return (
		<div className='ee-entity-pagination'>
			<Pagination
				{...rest}
				onChange={onChange}
				pageSize={pageSize}
				pageSizeOptions={pageSizeOptions}
				showTotal={showTotal}
				total={total}
			/>
		</div>
	);
};

export default EntityPagination;
