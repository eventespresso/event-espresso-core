import { ascend, descend, prop, sort, sortWith } from 'ramda';

import { Price, Ticket } from '../../../../eventEditor/services/apollo/types';

type comparator = <T extends Price>(a: T, b: T) => number;
type sortPricesFn = <T extends Price>(c: T[]) => T[];

const ascendingPriceDbId: comparator = ascend(prop('dbId'));
const descendingPriceDbId: comparator = descend(prop('dbId'));
const ascendingPriceName: comparator = ascend(prop('name'));
const descendingPriceName: comparator = descend(prop('name'));
const ascendingPriceOrder: comparator = ascend(prop('order'));
const descendingPriceOrder: comparator = descend(prop('order'));

export const sortByPriceDbIdAsc: sortPricesFn = sort(ascendingPriceDbId);
export const sortByPriceDbIdDesc: sortPricesFn = sort(descendingPriceDbId);

export const sortByPriceNameAsc: sortPricesFn = sort(ascendingPriceName);
export const sortByPriceNameDesc: sortPricesFn = sort(descendingPriceName);

export const sortByPriceOrderAsc: sortPricesFn = sort(ascendingPriceOrder);
export const sortByPriceOrderDesc: sortPricesFn = sort(descendingPriceOrder);

export const sortByPriceOrderIdAsc: sortPricesFn = sortWith([ascendingPriceOrder, ascendingPriceDbId]);
export const sortByPriceOrderIdDesc: sortPricesFn = sortWith([descendingPriceOrder, descendingPriceDbId]);
export const sortByPriceOrderNameAsc: sortPricesFn = sortWith([ascendingPriceOrder, ascendingPriceName]);
export const sortByPriceOrderNameDesc: sortPricesFn = sortWith([descendingPriceOrder, descendingPriceName]);

export const sortPrices = (ticket: Ticket) => <T extends Price>(prices: T[]): T[] =>
	ticket.reverseCalculate ? sortByPriceOrderIdDesc(prices) : sortByPriceOrderIdAsc(prices);

export default sortPrices;
