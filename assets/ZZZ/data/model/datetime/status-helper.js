import { __ } from '@eventespresso/i18n';

import parseInfinity from '../../../utils/parse-infinity';

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if tickets sold meets or exceeds registration limit
 */
export const isSoldOut = (DateTimeEntity, includeTrashed = false) => {
	if ((includeTrashed && !assertDateTimeEntity(DateTimeEntity)) || (!includeTrashed && isTrashed(DateTimeEntity))) {
		return false;
	}
	let cap = DateTimeEntity.regLimit;
	cap = parseInfinity(cap, true);
	return cap !== Infinity && DateTimeEntity.sold >= cap;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if start date is in the future
 */
export const isUpcoming = (DateTimeEntity, includeTrashed = false) => {};
