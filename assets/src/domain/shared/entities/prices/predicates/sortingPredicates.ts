import { ascend, descend, prop, sort, sortWith } from 'ramda';

import { EntityId, Price, Ticket } from '../../../../eventEditor/services/apollo/types';

type sortFn = (a: Price, b: Price) => number;
type sortPricesFn = (c: Price[]) => Price[];

const ascendingPriceDbId: sortFn = ascend<Price>(prop<EntityId>('dbid'));
const descendingPriceDbId: sortFn = descend<Price>(prop<EntityId>('dbid'));
const ascendingPriceName: sortFn = ascend<Price>(prop<string>('name'));
const descendingPriceName: sortFn = descend<Price>(prop<string>('name'));
const ascendingPriceOrder: sortFn = ascend<Price>(prop<string>('order'));
const descendingPriceOrder: sortFn = descend<Price>(prop<string>('order'));

export const sortByPriceDbIdAsc: sortPricesFn = sort<Price>(ascendingPriceDbId);
export const sortByPriceDbIdDesc: sortPricesFn = sort<Price>(descendingPriceDbId);

export const sortByPriceNameAsc: sortPricesFn = sort<Price>(ascendingPriceName);
export const sortByPriceNameDesc: sortPricesFn = sort<Price>(descendingPriceName);

export const sortByPriceOrderAsc: sortPricesFn = sort<Price>(ascendingPriceOrder);
export const sortByPriceOrderDesc: sortPricesFn = sort<Price>(descendingPriceOrder);

export const sortByPriceOrderIdAsc: sortPricesFn = sortWith<Price>([ascendingPriceOrder, ascendingPriceDbId]);
export const sortByPriceOrderIdDesc: sortPricesFn = sortWith<Price>([descendingPriceOrder, descendingPriceDbId]);
export const sortByPriceOrderNameAsc: sortPricesFn = sortWith<Price>([ascendingPriceOrder, ascendingPriceName]);
export const sortByPriceOrderNameDesc: sortPricesFn = sortWith<Price>([descendingPriceOrder, descendingPriceName]);

export const sortPrices = (ticket: Ticket) => (prices: Price[]) =>
	ticket.reverseCalculate ? sortByPriceOrderIdDesc(prices) : sortByPriceOrderIdAsc(prices);

export default sortPrices;
