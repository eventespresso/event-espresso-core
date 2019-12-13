import { assocPath, pathOr } from 'ramda';
import { queries } from '../../queries';
const { GET_PRICES } = queries;

const updatePriceCache = ({ proxy, prices, ticketIn, ticketId, remove = false }) => {
	let data;
	// Read the existing data from cache.
	try {
		data = proxy.readQuery({
			query: GET_PRICES,
			variables: {
				where: {
					ticketIn,
				},
			},
		});
	} catch (error) {
		data = {};
	}

	const newTicketIn = remove ? ticketIn.filter((id) => id !== ticketId) : [...ticketIn, ticketId];

	let newData;
	if (!remove && prices.length) {
		const pathToNodes = ['prices', 'nodes'];
		const existingPrices = pathOr([], pathToNodes, data);
		newData = assocPath(pathToNodes, [...existingPrices, ...prices], data);
	}

	// write the data to cache without
	// mutating the cache directly
	proxy.writeQuery({
		query: GET_PRICES,
		data: newData || data,
		variables: {
			where: {
				ticketIn: newTicketIn,
			},
		},
	});
};

export default updatePriceCache;
