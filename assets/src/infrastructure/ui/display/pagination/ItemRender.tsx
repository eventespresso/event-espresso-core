import React from 'react';
import type { PaginationProps as RcPaginationProps } from 'rc-pagination';

type ItemType = 'prev' | 'next' | 'jump-prev' | 'jump-next' | 'page';
/**
 * Can be used to customize the rendering of pangination items
 */
const ItemRender: RcPaginationProps['itemRender'] = (page, type: ItemType, element) => {
	return <div className='ee-pagination__item'>{element}</div>;
};

export default ItemRender;
