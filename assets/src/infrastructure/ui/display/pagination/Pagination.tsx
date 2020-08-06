import React from 'react';
import RcPagination from 'rc-pagination';

import 'rc-pagination/assets/index.css';
import defaultLocale from 'rc-pagination/lib/locale/en_US';
import './style.scss';

import defaultItemRender from './ItemRender';
import { PaginationProps } from './types';
import PerPage from './PerPage';

const Pagination: React.FC<PaginationProps> = ({
	defaultPageNumber = 1,
	defaultPerPage,
	hideOnSinglePage = true,
	locale = defaultLocale,
	onChangePageNumber,
	onChangePerPage,
	pageNumber,
	perPage,
	perPageOptions = ['2', '6', '12', '24', '48'],
	showPerPageChanger,
	total,
	...props
}) => {
	return (
		<div className='ee-pagination'>
			<RcPagination
				{...props}
				current={pageNumber}
				defaultCurrent={defaultPageNumber}
				hideOnSinglePage={hideOnSinglePage}
				itemRender={defaultItemRender}
				locale={locale}
				onChange={onChangePageNumber}
				pageSize={perPage}
				showSizeChanger={false}
				total={total}
			/>
			{showPerPageChanger && (
				<PerPage
					defaultPerPage={defaultPerPage}
					locale={locale}
					onChangePerPage={onChangePerPage}
					pageNumber={pageNumber}
					perPage={perPage}
					perPageOptions={perPageOptions}
					total={total}
				/>
			)}
		</div>
	);
};

export default Pagination;
