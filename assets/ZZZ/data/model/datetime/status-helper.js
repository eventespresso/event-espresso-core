import { __ } from '@eventespresso/i18n';

import { MONTH_IN_SECONDS } from './constants';
import parseInfinity from '../../../utils/parse-infinity';

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if event date is occurring NOW
 */
export const isActive = (DateTimeEntity, includeTrashed = false) => {
	return (
		isValidEntityOrArchive(DateTimeEntity, includeTrashed) &&
		DateTimeEntity.start.diffNow().asSeconds() < 0 &&
		DateTimeEntity.end.diffNow().asSeconds() > 0
	);
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if end date is in the past
 */
export const isExpired = (DateTimeEntity, includeTrashed = false) => {
	return isValidEntityOrArchive(DateTimeEntity, includeTrashed) && DateTimeEntity.end.diffNow().asSeconds() < 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if end date is in the past
 */
export const isRecentlyExpired = (DateTimeEntity, includeTrashed = false) => {
	return (
		isValidEntityOrArchive(DateTimeEntity, includeTrashed) &&
		DateTimeEntity.end.diffNow().asSeconds() < 0 &&
		DateTimeEntity.end.diffNow().asSeconds() > MONTH_IN_SECONDS * -1
	);
};

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
