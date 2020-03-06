import React from 'react';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

import './style.scss';
import { EntityListFilterStateManager } from '../filterBar';

interface EntityPaginationProps<ELFS extends EntityListFilterStateManager> extends PaginationProps {
	filterState: ELFS;
}

/**
 * Adds pagination to an "EntityList" component
 * @return EntityPagination
 */
const EntityPagination: React.FC<EntityPaginationProps<any>> = ({
	pageSizeOptions = ['2', '6', '12', '24', '48'],
	showSizeChanger = true,
	showTotal,
	filterState,
	...rest
}) => {
	const { total, setPageNumber, setPerPage, pageNumber }: EntityListFilterStateManager = filterState;
	return (
		<div className='ee-entity-pagination'>
			<Pagination
				{...rest}
				defaultPageSize={6}
				pageSizeOptions={pageSizeOptions}
				showSizeChanger={showSizeChanger}
				showTotal={showTotal}
				total={total}
				onChange={setPageNumber}
				onShowSizeChange={setPerPage}
				current={pageNumber}
			/>
		</div>
	);
};

export default EntityPagination;
