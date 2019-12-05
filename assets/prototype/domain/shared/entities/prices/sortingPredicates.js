import { ascend, descend, prop, sortBy, sortWith } from 'ramda';

const ascendingPriceId = ascend(prop('priceId'));
const descendingPriceId = descend(prop('priceId'));
const ascendingPriceName = ascend(prop('name'));
const descendingPriceName = descend(prop('name'));
const ascendingPriceOrder = ascend(prop('order'));
const descendingPriceOrder = descend(prop('order'));

export const sortByPriceIdAsc = sortBy(ascendingPriceId);
export const sortByPriceIdDesc = sortBy(descendingPriceId);

export const sortByPriceNameAsc = sortBy(ascendingPriceName);
export const sortByPriceNameDesc = sortBy(descendingPriceName);

export const sortByPriceOrderAsc = sortBy(ascendingPriceOrder);
export const sortByPriceOrderDesc = sortBy(descendingPriceOrder);

export const sortByPriceOrderIdAsc = sortWith([ascendingPriceOrder, ascendingPriceId]);
export const sortByPriceOrderIdDesc = sortWith([descendingPriceOrder, descendingPriceId]);
export const sortByPriceOrderNameAsc = sortWith([ascendingPriceOrder, ascendingPriceName]);
export const sortByPriceOrderNameDesc = sortWith([descendingPriceOrder, descendingPriceName]);

export const sortPrices = (ticket) => (prices) => ticket.reverseCalculate ?
	sortByPriceOrderIdDesc(prices) :
	sortByPriceOrderIdAsc(prices);

export default sortPrices;
