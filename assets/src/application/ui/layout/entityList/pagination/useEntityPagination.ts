import { slice } from 'ramda';
import { useCallback, useState } from 'react';

import { Entity } from '@appServices/apollo/types';
import { PaginationProps, onChangeFn, onShowSizeChangeFn } from './types';
import { EntityListComponentProps } from '../types';

const useEntityPagination = <E extends Entity>({ entities }: EntityListComponentProps<E>): PaginationProps<E> => {
	const [pageNumber, setPageNumber] = useState(1);
	const [perPage, setPerPage] = useState(6);
	const paginatedEntities = slice<E>(perPage * (pageNumber - 1), perPage * pageNumber, entities);
	const total = entities.length;

	const onChange: onChangeFn = useCallback((newPageNumber) => setPageNumber(newPageNumber), []);

	const onShowSizeChange: onShowSizeChangeFn = useCallback((newPageNumber, newPerPage) => {
		// the pagination component will recalculate the page number
		// if it goes out of range after changing the perPage value,
		// so save that else we'll get no results returned
		if (newPageNumber && newPageNumber !== pageNumber) {
			setPageNumber(newPageNumber);
		}
		setPerPage(newPerPage);
	}, []);

	return {
		onChange,
		onShowSizeChange,
		paginatedEntities,
		total,
	};
};

export default useEntityPagination;
