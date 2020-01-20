// @ts-nocheck
import React, { useCallback } from 'react';
import clone from 'ramda/src/clone';
import { __ } from '@wordpress/i18n';

import AddPriceModifierButton from './AddPriceModifierButton';
import { AddPriceModifierDataProps } from '../types';
import { Price } from '../../../data/types';
import { findEntityByGuid } from '../../../../shared/predicates/shared/selectionPredicates';

const AddPriceModifierButtonData = ({
	modifiers,
	name,
	price,
	push,
	reset,
	sort,
}: AddPriceModifierDataProps): JSX.Element => {
	const getPriceType = findEntityByGuid(modifiers);
	const addPriceModifier = useCallback(() => {
		if (Number(price.amount)) {
			const priceClone = clone(price);
			const baseType = getPriceType(priceClone.priceType.id);
			const newPrice: Price = {
				...priceClone,
				id: '',
				isBasePrice: baseType.isBasePrice,
				isDiscount: baseType.isDiscount,
				isPercent: baseType.isPercent,
				isTax: baseType.isTax,
				order: baseType.order,
				priceType: baseType,
			};
			push(newPrice);
			reset(name);
			sort();
		} else {
			alert(__('Please enter an amount for the new price modifier.'));
			return;
		}
	}, []);
	return <AddPriceModifierButton addPriceModifier={addPriceModifier} />;
};
export default AddPriceModifierButtonData;
