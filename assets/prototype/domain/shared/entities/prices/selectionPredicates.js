import { assoc, find, map, propEq, when } from 'ramda';

export const priceHasDbId = (dbid) => propEq('dbid', id);
export const priceHasGuid = (guid) => propEq('guid', guid);
export const isBasePrice = propEq('isBasePrice', true);
export const findBasePrice = (prices) => find(isBasePrice)(prices);
export const findPriceById = ({ prices, id }) => find(priceHasDbId(id))(prices);
export const findPriceByGuid = ({ prices, guid }) => find(priceHasGuid(guid))(prices);
export const updatePriceAmount = (amount) => assoc('amount', amount);
export const updatePriceType = (type) => assoc('priceType', type);

export const updateBasePriceAmount = ({ prices, amount }) => map(when(isBasePrice, updatePriceAmount(amount)), prices);
export const updatePriceTypeForPrice = ({ prices, guid, type }) => map(
	when(priceHasGuid(guid), updatePriceType(type)),
	prices
);
export const updatePriceAmountForPrice = ({ prices, guid, amount }) => map(
	when(priceHasGuid(guid), updatePriceAmount(amount)),
	prices
);
