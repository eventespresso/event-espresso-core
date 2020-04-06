import React, { useCallback } from 'react';
import { DownCircleFilled, UpCircleFilled } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { Cell } from '@appLayout/espressoTable';
import { EspressoButton } from '@application/ui/input';
import { parsedAmount } from '@appServices/utilities/money';
import { TicketPriceField } from '../../fields';
import { FormatAmountFunction } from '@appServices/utilities/money/formatAmount';
import { FooterRow } from '@appLayout/espressoTable';

interface Props {
	formatAmount: FormatAmountFunction;
	reverseCalculate: boolean;
	toggleCalcDir: VoidFunction;
}

type FooterRowGenerator = (props: Props) => FooterRow;

const useFooterRowGenerator = (): FooterRowGenerator => {
	return useCallback<FooterRowGenerator>(({ formatAmount, reverseCalculate, toggleCalcDir }: Props) => {
		const calcDirIcon = reverseCalculate ? <UpCircleFilled /> : <DownCircleFilled />;

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
				key: 'desc',
				type: 'cell',
				className: 'ee-ticket-price-calculator-total-label' + ' ee-number-column',
				value: __('Total'),
			},
			{
				key: 'amount',
				type: 'cell',
				className: 'ee-ticket-price-calculator-total ee-number-column',
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
				className: 'ee-ticket-price-calculator-total-actions',
				value: <EspressoButton icon={calcDirIcon} onClick={toggleCalcDir} />,
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
