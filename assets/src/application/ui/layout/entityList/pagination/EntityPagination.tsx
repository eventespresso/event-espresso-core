import React from 'react';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

import './style.scss';

/**
 * Adds pagination to an "EntityList" component
 * @return EntityPagination
 */
const EntityPagination = ({
	current,
	onChange,
	pageSize = 10,
	pageSizeOptions = ['6', '12', '24', '48'],
	showTotal,
	total,
}: PaginationProps) => {
	return (
		<div className='ee-entity-pagination'>
			<Pagination
				current={current}
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
