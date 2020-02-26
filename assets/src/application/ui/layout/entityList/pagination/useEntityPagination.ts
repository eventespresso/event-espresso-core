import { useState } from 'react';
import { slice } from 'ramda';

const useEntityPagination = ({ entities }) => {
	const [perPage, setPerPage] = useState(6);
	const initialPaginatedEntities = slice(0, perPage)(entities);
	const [paginatedEntities, setPaginatedEntities] = useState(initialPaginatedEntities);
	const total = entities.length;
	// const pageNumber = parseInt(currentPage, 10);
	// const lastPage = Math.ceil(entities.length / perPage);
	// const actualPageNumber = pageNumber <= lastPage ? pageNumber : lastPage;

	// useEffect(() => {
	// 	if (pageNumber > 1 && pageNumber > lastPage) {
	// 		setCurrentPage(lastPage);
	// 	}
	// }, [perPage, currentPage, entities.length]);

	const onChange = (page) => {
		const slicedEntities = slice(perPage * (page - 1), perPage * page)(entities);
		setPaginatedEntities(slicedEntities);
	};

	const onShowSizeChange = (current, size) => {
		const slicedEntities = slice(size * (current - 1), size * current)(entities);
		setPerPage(size);
		setPaginatedEntities(slicedEntities);
	};

	return {
		// currentPage: actualPageNumber,
		onChange,
		onShowSizeChange,
		paginatedEntities,
		total,
		// setCurrentPage,
		// paginatedEntities: Array.isArray(entities)
		// 	? entities.slice((actualPageNumber - 1) * perPage, actualPageNumber * perPage)
		// 	: EMPTY_ARRAY,
	};
};

export default useEntityPagination;
