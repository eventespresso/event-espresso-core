// @ts-nocheck
import React, { useCallback } from 'react';
import clone from 'ramda/src/clone';
import { __ } from '@wordpress/i18n';

import AddPriceModifierButton from './AddPriceModifierButton';
import { AddPriceModifierDataProps } from '../types';
import usePriceTypeForPrice from '../../../data/queries/priceTypes/usePriceTypeForPrice';
import { Price } from '../../../data/types';
// import { findEntityByGuid } from '../../../../shared/predicates/shared/selectionPredicates';
import { useRelations } from '../../../../../application/services/apollo/relations';

const AddPriceModifierButtonData = ({ name, price, push, reset, sort }: AddPriceModifierDataProps): JSX.Element => {
	const { addRelation } = useRelations();
	const baseType = usePriceTypeForPrice(price.id);
	const addPriceModifier = useCallback(() => {
		if (Number(price.amount)) {
			const priceClone = clone(price);
			const newPrice: Price = {
				...priceClone,
				id: '',
				isBasePrice: baseType.isBasePrice,
				isDiscount: baseType.isDiscount,
				isPercent: baseType.isPercent,
				isTax: baseType.isTax,
				order: baseType.order,
			};
			addRelation({
				entity: 'prices',
				entityId: newPrice.id,
				relation: 'priceTypes',
				relationId: baseType.id,
			});
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
