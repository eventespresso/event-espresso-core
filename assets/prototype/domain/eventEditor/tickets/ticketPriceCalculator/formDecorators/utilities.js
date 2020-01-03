import path from 'ramda/src/path';
import { amountsMatch } from '../../../../../application/utilities/money';
export const isEqual = (value, prev) => prev === null || prev === undefined || value === prev;
export const boolsEqual = (value, prev) => prev === null || prev === undefined || !!value === !!prev;
export const amountsEqual = (value, prev) => prev === null || prev === undefined || amountsMatch(prev, value);

export const pathName = (name) =>
	name
		.replace('[', '.')
		.replace(']', '')
		.split('.');

export const getFromFormData = (name, data) => {
	const namePath = pathName(name);
	return path(namePath, data);
};

export const parseAmountFromPath = (path, data) => {
	const amount = getFromFormData(path, data);
	return { [path]: parseFloat(amount || 0) };
};
