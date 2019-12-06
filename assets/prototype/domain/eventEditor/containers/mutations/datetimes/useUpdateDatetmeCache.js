import useDateimeQueryOptions from './useDateimeQueryOptions';

const useUpdateDatetmeCache = () => {
	const options = useDateimeQueryOptions();

	const updateDatetmeCache = ({ proxy, datetimes, datetime, remove = false }) => {
		const nodes = datetimes.nodes;
		// remove from or add to the list
		const newNodes = remove ? nodes.filter(({ id }) => id !== datetime.id) : [...nodes, datetime];

		// write the data to cache without
		// mutating the cache directly
		proxy.writeQuery({
			...options,
			data: {
				datetimes: {
					...datetimes,
					nodes: newNodes,
				},
			},
		});
	};

	return updateDatetmeCache;
};

export default useUpdateDatetmeCache;
