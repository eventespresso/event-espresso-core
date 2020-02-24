import { useState } from 'react';
import { slice } from 'ramda';
const EMPTY_ARRAY = [];

const useEntityPagination = ({ entities, perPage }) => {
	const initialPaginatedEntities = slice(0, perPage)(entities);
	const [paginatedEntities, setCurrentPage] = useState(initialPaginatedEntities);
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
		console.log(slicedEntities.length);
		setCurrentPage(slicedEntities);
	};

	return {
		// currentPage: actualPageNumber,
		onChange,
		paginatedEntities,
		total,
		// setCurrentPage,
		// paginatedEntities: Array.isArray(entities)
		// 	? entities.slice((actualPageNumber - 1) * perPage, actualPageNumber * perPage)
		// 	: EMPTY_ARRAY,
	};
};

export default useEntityPagination;
