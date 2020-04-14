import React from 'react';

export interface PaginationProps extends PerPageProps {
	defaultPageNumber?: number;
	hideOnSinglePage?: boolean;
	onChangePageNumber: (pageNumber: number, perPage: number) => void;
	showPerPageChanger: boolean;
	showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}

export interface PerPageProps {
	className?: string;
	defaultPerPage: number;
	locale?: Locale;
	onChangePerPage: (newPageNumber: number, newPerPage: number) => void;
	pageNumber: number;
	perPage: number;
	perPageOptions?: string[];
	total: number;
}

export interface Locale {
	items_per_page?: string;
}
