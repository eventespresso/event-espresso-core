import { queries } from '../../queries';
const { GET_TICKETS } = queries;

const updateTicketCache = ({ proxy, datetimeIn, datetimeId, remove = false }) => {
	// Read the existing data from cache.
	const data = proxy.readQuery({
		query: GET_TICKETS,
		variables: {
			where: {
				datetimeIn,
			},
		},
	});

	const newDatetimeIn = remove ? datetimeIn.filter((id) => id !== datetimeId) : [...datetimeIn, datetimeId];

	// write the data to cache without
	// mutating the cache directly
	proxy.writeQuery({
		query: GET_TICKETS,
		data,
		variables: {
			where: {
				datetimeIn: newDatetimeIn,
			},
		},
	});
};

export default updateTicketCache;
