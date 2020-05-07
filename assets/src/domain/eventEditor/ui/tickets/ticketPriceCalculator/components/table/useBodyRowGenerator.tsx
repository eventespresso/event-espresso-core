import React, { useCallback } from 'react';

import PriceAmountInput from '../../inputs/PriceAmountInput';
import PriceDescriptionInput from '../../inputs/PriceDescriptionInput';
import PriceIdInput from '../../inputs/PriceIdInput';
import PriceNameInput from '../../inputs/PriceNameInput';
import PriceModifierActions from '../../buttons/PriceModifierActions';
import PriceTypeInput from '../../inputs/PriceTypeInput';
import { TpcPriceModifier } from '../../types';
import { BodyRow } from '@appLayout/espressoTable';

type Props = {
	index: number;
	price?: TpcPriceModifier;
};

type BodyRowGenerator = (props: Props) => BodyRow;

const useBodyRowGenerator = (): BodyRowGenerator => {
	return useCallback<BodyRowGenerator>(({ index, price }: Props) => {
		const cells = [
			{
				key: 'id',
				type: 'cell',
				className: 'ee-ticket-price-calculator-price-id ee-number-column',
				value: <PriceIdInput price={price} />,
			},
			{
				key: 'type',
				type: 'cell',
				className: 'ee-ticket-price-calculator-price-type',
				value: <PriceTypeInput price={price} />,
			},
			{
				key: 'name',
				type: 'cell',
				className: 'ee-ticket-price-calculator-price-name',
				value: <PriceNameInput price={price} />,
			},
			{
				key: 'description',
				type: 'cell',
				className: 'ee-ticket-price-calculator-price-desc',
				value: <PriceDescriptionInput price={price} />,
			},
			{
				key: 'amount',
				type: 'cell',
				className: 'ee-ticket-price-calculator-price-amount ee-number-column',
				value: <PriceAmountInput price={price} />,
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-ticket-price-calculator__actions',
				value: <PriceModifierActions index={index} price={price} />,
			},
		];

		return {
			cells,
			className: `ee-editor-date-list-view-row`,
			id: `ee-editor-date-list-view-row-${price.id}`,
			key: `row-${index}`,
			type: 'row',
		};
	}, []);
};

export default useBodyRowGenerator;
