import { SiteCurrency } from '@eventespresso/value-objects';
import {
	currencySignCharacterCount,
	currencySignPositionClass,
} from './currency-sign-utils';

/**
 * @function
 * @return {Object} $ sign
 */
const CurrencySign = () => {
	let signClass = 'ee-currency-sign';
	signClass += currencySignPositionClass();
	signClass += currencySignCharacterCount();
	return (
		<div className={ signClass }>
			{ SiteCurrency.sign }
		</div>
	);
};

export default CurrencySign;
