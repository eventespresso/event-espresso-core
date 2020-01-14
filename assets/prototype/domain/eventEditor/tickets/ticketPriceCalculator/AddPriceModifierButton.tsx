import React from 'react';
import clone from 'ramda/src/clone';
import { Button } from '@blueprintjs/core';

/**
 * Internal imports
 */
import { Price } from '../../data/types';
import { findEntityByGuid } from '../../../shared/predicates/shared/selectionPredicates';

type AddPriceModifierButtonProps = {
	modifiers: Price[];
	name: string;
	price: Price;
	push: (price: Price) => void;
	reset: (name: string) => void;
	sort: () => void;
};

const AddPriceModifierButton = ({ modifiers, name, price, push, reset, sort }: AddPriceModifierButtonProps) => {
	const getPriceType = findEntityByGuid(modifiers);
	return (
		<Button
			key={'add'}
			icon={'add'}
			onClick={() => {
				if (price.amount && !isNaN(price.amount)) {
					const priceClone: Price = clone(price);
					const baseType: Price = getPriceType(priceClone.priceType);
					const newPrice = {
						...priceClone,
						id: '',
						isBasePrice: baseType.isBasePrice,
						isDiscount: baseType.isDiscount,
						isPercent: baseType.isPercent,
						isTax: baseType.isTax,
						order: baseType.order,
						priceType: baseType.id,
						priceTypeOrder: baseType.order,
					};
					push(newPrice);
					reset(name);
					sort();
				} else {
					alert('Please enter an amount for the new price modifier.');
					return;
				}
			}}
			minimal
		/>
	);
};

export default AddPriceModifierButton;
