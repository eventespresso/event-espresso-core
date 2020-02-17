// @ts-nocheck
import React from 'react';
import Currency from 'react-currency-formatter';

import { InlineEditText } from '@appInputs/InlineEditInput';
import { parsedAmount } from '@appServices/utilities/money';

const nullFunc = (args?: any) => {};

interface CurrencyInputProps {
	id: string;
	amount: string | number;
	placeholder?: string;
	onConfirm?: (result?: { amount: string | number; id: string }) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ id = '', amount = 0, onConfirm = nullFunc }) => {
	const safeAmount = parsedAmount(amount);
	return (
		<>
			<Currency quantity={safeAmount} />
			<InlineEditText
				key={id}
				onChange={(value: string) => {
					const newAmount = parsedAmount(value);
					if (newAmount !== amount) {
						onConfirm({ amount: newAmount, id });
					}
				}}
			>
				{safeAmount}
			</InlineEditText>
		</>
	);
};

export default CurrencyInput;
