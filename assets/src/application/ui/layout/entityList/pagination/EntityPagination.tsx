import React from 'react';
import classNames from 'classnames';
import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';

import { EntityListFilterStateManager } from '../filterBar';
import './style.scss';

interface EntityPaginationProps<ELFS extends EntityListFilterStateManager> extends PaginationProps {
	filterState: ELFS;
}

/**
 * Adds pagination to an "EntityList" component
 * @return EntityPagination
 */
const EntityPagination: React.FC<EntityPaginationProps<any>> = ({
	filterState,
	pageSizeOptions = ['2', '6', '12', '24', '48'],
	showSizeChanger = true,
	showTotal,
	...rest
}) => {
	const { pageNumber, perPage, setPerPage, setPageNumber, total }: EntityListFilterStateManager = filterState;

	console.log({ perPage, total });

	const className = classNames('ee-entity-pagination', { hidePagination: total <= perPage });

	return (
		<div className={className}>
			<Pagination
				{...rest}
				current={pageNumber}
				defaultPageSize={6}
				onChange={setPageNumber}
				onShowSizeChange={setPerPage}
				pageSizeOptions={pageSizeOptions}
				showSizeChanger={showSizeChanger}
				showTotal={showTotal}
				total={total}
			/>
		</div>
	);
};

export default EntityPagination;
