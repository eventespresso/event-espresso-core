import { Price } from '../../../services/apollo/types';

const defaultPriceModifier: Price = {
	id: 'NEW_PRICE',
	dbId: 0,
	amount: null,
	desc: '',
	isBasePrice: false,
	isDefault: false,
	isDiscount: false,
	isPercent: false,
	isTax: false,
	isTrashed: false,
	name: '',
	order: 999,
	overrides: null,
};

export default defaultPriceModifier;
