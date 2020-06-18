import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Cell } from '@appLayout/espressoTable';
import { FooterRow } from '@appLayout/espressoTable';
import { FormatAmountFunction } from '@appServices/utilities/money/formatAmount';
import { parsedAmount } from '@appServices/utilities/money';
import { TicketPriceField } from '../../fields';
import ReverseCalculateButton from '../../buttons/ReverseCalculateButton';

interface Props {
	formatAmount: FormatAmountFunction;
	reverseCalculate: boolean;
	toggleCalcDir: VoidFunction;
}

type FooterRowGenerator = (props: Props) => FooterRow;

const useFooterRowGenerator = (): FooterRowGenerator => {
	return useCallback<FooterRowGenerator>(({ formatAmount, reverseCalculate, toggleCalcDir }: Props) => {

		const cells: Array<Cell> = [
			{
				key: 'id',
				type: 'cell',
				className: '',
				value: '',
			},
			{
				key: 'type',
				type: 'cell',
				className: '',
				value: '',
			},
			{
				key: 'name',
				type: 'cell',
				className: '',
				value: '',
			},
			{
				key: 'description',
				type: 'cell',
				className: 'ee-ticket-price-calculator-total-label ee-number-column',
				value: __('Total'),
			},
			{
				key: 'amount',
				type: 'cell',
				className: 'ee-ticket-price-calculator__amount ee-ticket-price-calculator__total ee-number-column',
				value: (
					<TicketPriceField
						component='input'
						disabled={!reverseCalculate}
						format={(price) => formatAmount(price) ?? ''}
						formatOnBlur
						parse={(price) => parsedAmount(price)}
						type='number'
					/>
				),
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-ticket-price-calculator__actions',
				value: <ReverseCalculateButton reverseCalculate={reverseCalculate} toggleCalcDir={toggleCalcDir} />,
			},
		];

		return {
			cells,
			className: 'ee-ticket-price-calculator-total-row',
			key: 'price-total-row',
			primary: true,
			type: 'row',
		};
	}, []);
};

export default useFooterRowGenerator;
