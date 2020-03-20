import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { v4 as uuidv4 } from 'uuid';

import AddPriceModifierButton from './AddPriceModifierButton';
import { usePriceTypeForPrice } from '@edtrServices/apollo/queries';
import { PriceModifierProps, TpcPriceModifier } from '../types';
import { usePriceModifier } from '../hooks';
import defaultPrice from '../defaultPriceModifier';
import { useDataState } from '../data';

const AddPriceModifierButtonData: React.FC<Partial<PriceModifierProps>> = ({ index }) => {
	const defaultPriceModifier = usePriceModifier(defaultPrice);
	const baseType = usePriceTypeForPrice(defaultPriceModifier.id);

	const { addPrice } = useDataState();

	const addPriceModifier = useCallback(() => {
		const newPrice: TpcPriceModifier = {
			...defaultPriceModifier,
			id: uuidv4(),
			isBasePrice: baseType.isBasePrice,
			isDiscount: baseType.isDiscount,
			isPercent: baseType.isPercent,
			isTax: baseType.isTax,
			order: baseType.order,
			isNew: true,
		};

		addPrice(newPrice, index + 1);
	}, [index]);
	return <AddPriceModifierButton addPriceModifier={addPriceModifier} />;
};
export default AddPriceModifierButtonData;
