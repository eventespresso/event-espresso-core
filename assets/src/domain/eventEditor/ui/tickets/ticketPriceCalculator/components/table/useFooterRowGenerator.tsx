import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { Cell } from '@appLayout/espressoTable';
import { DownCircleFilled, UpCircleFilled } from '@appDisplay/icons/svgs';
import { IconButton } from '@application/ui/input';
import { parsedAmount } from '@appServices/utilities/money';
import { TicketPriceField } from '../../fields';
import { FormatAmountFunction } from '@appServices/utilities/money/formatAmount';
import { FooterRow } from '@appLayout/espressoTable';
import AddDefaultTaxesButton from '../../buttons/AddDefaultTaxesButton';
import DeleteAllPricesButton from '../../buttons/DeleteAllPricesButton';

interface Props {
	formatAmount: FormatAmountFunction;
	reverseCalculate: boolean;
	toggleCalcDir: VoidFunction;
}

type FooterRowGenerator = (props: Props) => FooterRow;

const useFooterRowGenerator = (): FooterRowGenerator => {
	return useCallback<FooterRowGenerator>(({ formatAmount, reverseCalculate, toggleCalcDir }: Props) => {
		const calcDirIcon = reverseCalculate ? UpCircleFilled : DownCircleFilled;

		const cells: Array<Cell> = [
			{
				key: 'id',
				type: 'cell',
				className: '',
				value: <DeleteAllPricesButton />,
			},
			{
				key: 'type',
				type: 'cell',
				className: '',
				value: <AddDefaultTaxesButton />,
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
						type={'number'}
						disabled={!reverseCalculate}
						format={(price) => formatAmount(price) ?? ''}
						parse={(price) => parsedAmount(price)}
						formatOnBlur
					/>
				),
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-ticket-price-calculator__actions',
				value: <IconButton icon={calcDirIcon} onClick={toggleCalcDir} /*  variant='outline' */ />,
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
