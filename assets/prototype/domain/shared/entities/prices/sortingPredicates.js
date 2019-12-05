import { ascend, descend, prop, sortBy, sortWith } from 'ramda';

const ascendingPriceDbId = ascend(prop('dbid'));
const descendingPriceDbId = descend(prop('dbid'));
const ascendingPriceName = ascend(prop('name'));
const descendingPriceName = descend(prop('name'));
const ascendingPriceOrder = ascend(prop('order'));
const descendingPriceOrder = descend(prop('order'));

export const sortByPriceDbIdAsc = sortBy(ascendingPriceDbId);
export const sortByPriceDbIdDesc = sortBy(descendingPriceDbId);

export const sortByPriceNameAsc = sortBy(ascendingPriceName);
export const sortByPriceNameDesc = sortBy(descendingPriceName);

export const sortByPriceOrderAsc = sortBy(ascendingPriceOrder);
export const sortByPriceOrderDesc = sortBy(descendingPriceOrder);

export const sortByPriceOrderIdAsc = sortWith([ascendingPriceOrder, ascendingPriceDbId]);
export const sortByPriceOrderIdDesc = sortWith([descendingPriceOrder, descendingPriceDbId]);
export const sortByPriceOrderNameAsc = sortWith([ascendingPriceOrder, ascendingPriceName]);
export const sortByPriceOrderNameDesc = sortWith([descendingPriceOrder, descendingPriceName]);

export const sortPrices = (ticket) => (prices) => ticket.reverseCalculate ?
	sortByPriceOrderIdDesc(prices) :
	sortByPriceOrderIdAsc(prices);

export default sortPrices;
