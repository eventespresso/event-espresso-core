import React, { CSSProperties } from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import defaultLocale from 'rc-pagination/lib/locale/en_US';

import { PaginationProps } from './types';
import PerPage from './PerPage';
import defaultItemRender from './ItemRender';

/* Temporary */
const wrapperStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	padding: '1em',
};
const paginationStyle: CSSProperties = {
	display: 'flex',
	marginRight: '1em',
};

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
	...rest
}) => {
	return (
		<div style={wrapperStyle}>
			<RcPagination
				{...rest}
				current={pageNumber}
				defaultCurrent={defaultPageNumber}
				hideOnSinglePage={hideOnSinglePage}
				itemRender={defaultItemRender}
				locale={locale}
				onChange={onChangePageNumber}
				pageSize={perPage}
				showSizeChanger={false}
				total={total}
				style={paginationStyle}
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
