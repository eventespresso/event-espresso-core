import React from 'react';
import classNames from 'classnames';
import { Pagination, PaginationProps } from '@infraUI/display';

import { EntityListFilterStateManager } from '../filterBar';
import './style.scss';

interface EntityPaginationProps<ELFS extends EntityListFilterStateManager> extends Partial<PaginationProps> {
	filterState: ELFS;
}

/**
 * Adds pagination to an "EntityList" component
 * @return EntityPagination
 */
const EntityPagination: React.FC<EntityPaginationProps<any>> = ({
	filterState,
	showPerPageChanger = true,
	showTotal,
	...rest
}) => {
	const { pageNumber, perPage, setPerPage, setPageNumber, total }: EntityListFilterStateManager = filterState;
	const className = classNames('ee-entity-pagination', { hidePagination: total <= perPage });

	return (
		<div className={className}>
			<Pagination
				{...rest}
				defaultPerPage={6}
				onChangePageNumber={setPageNumber}
				onChangePerPage={setPerPage}
				pageNumber={pageNumber}
				perPage={perPage}
				showPerPageChanger={showPerPageChanger}
				showTotal={showTotal}
				total={total}
			/>
		</div>
	);
};

export default EntityPagination;
