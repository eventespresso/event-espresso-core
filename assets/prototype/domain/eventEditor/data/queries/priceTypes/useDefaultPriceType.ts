import isEmpty from 'ramda/src/isEmpty';
import usePriceTypes from './usePriceTypes';
import { PriceType } from '../../types';

/**
 * A custom react hook for retrieving the default price type object.
 */
const useDefaultPriceType = (): PriceType => {
	const allPriceTypes: PriceType[] = usePriceTypes();
	const percentSurchargePriceTypes: PriceType[] = allPriceTypes.filter(
		({ baseType, isPercent }) => baseType === 'SURCHARGE' && isPercent
	);
	return !isEmpty(percentSurchargePriceTypes) ? percentSurchargePriceTypes[0] : null;
};

export default useDefaultPriceType;
