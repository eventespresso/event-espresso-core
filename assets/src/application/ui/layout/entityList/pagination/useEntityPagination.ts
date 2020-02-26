import { useState } from 'react';
import { slice } from 'ramda';

const useEntityPagination = ({ entities }) => {
	const [perPage, setPerPage] = useState(6);
	const initialPaginatedEntities = slice(0, perPage)(entities);
	const [paginatedEntities, setPaginatedEntities] = useState(initialPaginatedEntities);
	const total = entities.length;

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
		onChange,
		onShowSizeChange,
		paginatedEntities,
		total,
	};
};

export default useEntityPagination;
