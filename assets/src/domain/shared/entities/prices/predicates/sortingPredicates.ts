import { ascend, descend, prop, sort, sortWith } from 'ramda';

import { Price, Ticket } from '../../../../eventEditor/services/apollo/types';

type sortFn = <T extends Price>(a: T, b: T) => number;
type sortPricesFn = <T extends Price>(c: T[]) => T[];

const ascendingPriceDbId: sortFn = ascend(prop('dbid'));
const descendingPriceDbId: sortFn = descend(prop('dbid'));
const ascendingPriceName: sortFn = ascend(prop('name'));
const descendingPriceName: sortFn = descend(prop('name'));
const ascendingPriceOrder: sortFn = ascend(prop('order'));
const descendingPriceOrder: sortFn = descend(prop('order'));

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

export const sortPrices = (ticket: Ticket) => <T extends Price>(prices: T[]) =>
	ticket.reverseCalculate ? sortByPriceOrderIdDesc(prices) : sortByPriceOrderIdAsc(prices);

export default sortPrices;
