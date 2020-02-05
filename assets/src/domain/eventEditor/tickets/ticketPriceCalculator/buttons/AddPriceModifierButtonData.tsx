// @ts-nocheck
import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import AddPriceModifierButton from './AddPriceModifierButton';
import { AddPriceModifierDataProps } from '../types';
import usePriceTypeForPrice from '../../../data/queries/priceTypes/usePriceTypeForPrice';
import { Price } from '../../../data/types';

const AddPriceModifierButtonData = ({ name, price, push, reset, sort }: AddPriceModifierDataProps): JSX.Element => {
	const baseType = usePriceTypeForPrice(price.id);
	const addPriceModifier = useCallback(() => {
		if (Number(price.amount)) {
			const newPrice: Price = {
				...price,
				id: '',
				isBasePrice: baseType.isBasePrice,
				isDiscount: baseType.isDiscount,
				isPercent: baseType.isPercent,
				isTax: baseType.isTax,
				order: baseType.order,
			};
			push(newPrice);
			reset(name);
			sort();
		} else {
			alert(__('Please enter an amount for the new price modifier.'));
			return;
		}
	}, [price.name, price.priceType, price.desc, price.amount]);
	return <AddPriceModifierButton addPriceModifier={addPriceModifier} />;
};
export default AddPriceModifierButtonData;
