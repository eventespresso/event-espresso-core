import useDatetimeQueryOptions from '../../queries/datetimes/useDatetimeQueryOptions';

const useUpdateDatetimeCache = () => {
	const options = useDatetimeQueryOptions();

	const updateDatetimeCache = ({ proxy, datetimes, datetime, remove = false }) => {
		const { nodes = [] } = datetimes;
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

	return updateDatetimeCache;
};

export default useUpdateDatetimeCache;
