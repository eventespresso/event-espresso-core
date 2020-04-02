import React from 'react';
import { DownCircleFilled, UpCircleFilled } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { Cell } from '@appLayout/espressoTable';
import { EspressoButton } from '@application/ui/input';
import { useMoneyDisplay, parsedAmount } from '@appServices/utilities/money';
import { useDataState } from '../../data';
import { TicketPriceField } from '../../fields';

type Props = {
	signB4: boolean;
};

const footerRowsGenerator = ({ signB4 }: Props) => {
	const { afterAmount, beforeAmount, formatAmount } = useMoneyDisplay();
	const { reverseCalculate, toggleCalcDir } = useDataState();
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
				<>
					<div>{beforeAmount}</div>
					<TicketPriceField
						component='input'
						type={'number'}
						disabled={!reverseCalculate}
						format={(price) => formatAmount(price) || ''}
						parse={(price) => parsedAmount(price)}
						formatOnBlur
					/>
					<div>{afterAmount}</div>
				</>
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
};

export default footerRowsGenerator;
