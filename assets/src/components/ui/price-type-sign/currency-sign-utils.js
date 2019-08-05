import { SiteCurrency } from '@eventespresso/value-objects';

/**
 * @function
 * @return {string} currency sign char length css class
 */
export const currencySignCharacterCount = () => {
	return SiteCurrency.sign.length > 1 ?
		' ee-curSign-' + SiteCurrency.sign.length :
		'';
};

/**
 * @function
 * @return {string} currency sign position css class
 */
export const currencySignPositionClass = () => {
	return SiteCurrency.signB4 ? ' ee-sign-before' : ' ee-sign-after';
};

