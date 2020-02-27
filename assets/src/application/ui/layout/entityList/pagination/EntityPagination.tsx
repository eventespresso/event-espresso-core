import React from 'react';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

import './style.scss';

/**
 * Adds pagination to an "EntityList" component
 * @return EntityPagination
 */
const EntityPagination: React.FC<PaginationProps> = ({
	pageSizeOptions = ['2', '6', '12', '24', '48'],
	showSizeChanger = true,
	showTotal,
	total,
	...rest
}) => {
	return (
		<div className='ee-entity-pagination'>
			<Pagination
				{...rest}
				defaultPageSize={6}
				pageSizeOptions={pageSizeOptions}
				showSizeChanger={showSizeChanger}
				showTotal={showTotal}
				total={total}
			/>
		</div>
	);
};

export default EntityPagination;
