import type { PaginationProps as RcPaginationProps } from 'rc-pagination';

type ItemType = 'prev' | 'next' | 'jump-prev' | 'jump-next' | 'page';
/**
 * Can be used to customize the rendering of pangination items
 */
const ItemRender: RcPaginationProps['itemRender'] = (page, type: ItemType, element) => {
	return element;
};

export default ItemRender;
