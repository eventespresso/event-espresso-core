// @ts-nocheck
import React from 'react';

import { InlineEditText } from '@appInputs/InlineEditInput';
import { parsedAmount, useMoneyDisplay } from '@appServices/utilities/money';

const nullFunc = (args?: any) => {};

interface CurrencyInputProps {
	id: string;
	amount: string | number;
	placeholder?: string;
	onConfirm?: (result?: { amount: string | number; id: string }) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ id = '', amount = 0, onConfirm = nullFunc }) => {
	const { formatAmount, beforeAmount, afterAmount } = useMoneyDisplay();
	const formattedAmount = formatAmount(amount);
	return (
		<>
			{beforeAmount}
			<InlineEditText
				key={id}
				onChange={(value: string) => {
					const newAmount = parsedAmount(value);
					if (newAmount !== amount) {
						onConfirm({ amount: newAmount, id });
					}
				}}
			>
				{formattedAmount}
			</InlineEditText>
			{afterAmount}
		</>
	);
};

export default CurrencyInput;
