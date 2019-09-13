import { __ } from '@eventespresso/i18n';
import {
	currencySignCharacterCount,
	currencySignPositionClass,
} from './currency-sign-utils';

/**
 * @function
 * @return {Object} % sign
 */
const PercentSign = () => {
	let signClass = 'ee-percent-sign';
	signClass += currencySignPositionClass();
	signClass += currencySignCharacterCount();
	return (
		<div className={ signClass }>
			{ __( '%', 'event_espresso' ) }
		</div>
	);
};

export default PercentSign;
