import { Entity } from '@appServices/apollo/types';

export type onChangeFn = (page: number) => void;

export type onShowSizeChangeFn = (current: number, size: number) => void;

export interface PaginationProps {
	onChange: onChangeFn;
	onShowSizeChange: onShowSizeChangeFn;
	paginatedEntities: Entity[];
	total: number;
}
