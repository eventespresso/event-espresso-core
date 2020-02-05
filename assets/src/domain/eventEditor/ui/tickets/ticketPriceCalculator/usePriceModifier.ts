import { TpcPriceModifier } from './types';
import { Price } from '../../../services/apollo/types';
import usePriceTypeForPrice from '../../../services/apollo/queries/priceTypes/usePriceTypeForPrice';

const usePriceModifier = (price: Price): TpcPriceModifier => {
	const priceType = usePriceTypeForPrice(price.id);
	return {
		...price,
		priceType: priceType.id,
		priceTypeOrder: priceType.order,
	};
};

export default usePriceModifier;
