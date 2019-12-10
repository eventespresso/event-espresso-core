import isEmpty from 'ramda/src/isEmpty';
import usePriceTypes from './usePriceTypes';

/**
 * A custom react hook for retrieving the default price type object.
 */
const useDefaultPriceType = () => {
	const allPriceTypes = usePriceTypes();
	const percentSurchargePriceTypes = allPriceTypes.filter(
		({ baseType, isPercent }) => baseType === 'SURCHARGE' && isPercent
	);
	return !isEmpty(percentSurchargePriceTypes) ? percentSurchargePriceTypes[0] : {};
};

export default useDefaultPriceType;
