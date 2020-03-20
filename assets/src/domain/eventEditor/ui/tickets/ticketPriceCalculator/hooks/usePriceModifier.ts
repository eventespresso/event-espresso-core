import { TpcPriceModifier } from '../types';
import { Price, usePriceTypeForPrice } from '@edtrServices/apollo';

const usePriceModifier = (price: Price): TpcPriceModifier => {
	const priceType = usePriceTypeForPrice(price.id);
	return {
		...price,
		priceType: priceType.id,
		priceTypeOrder: priceType.order,
	};
};

export default usePriceModifier;
