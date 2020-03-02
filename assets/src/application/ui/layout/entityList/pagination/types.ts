import { Entity } from '@appServices/apollo/types';

export type onChangeFn = (page: number) => void;

export type onShowSizeChangeFn = (current: number, size: number) => void;

export interface PaginationProps<E extends Entity> {
	onChange: onChangeFn;
	onShowSizeChange: onShowSizeChangeFn;
	paginatedEntities: E[];
	total: number;
}
