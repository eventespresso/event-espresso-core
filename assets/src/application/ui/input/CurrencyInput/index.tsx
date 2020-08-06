import React, { useCallback } from 'react';

import { InlineEditText } from '../InlineEditInput';
import { parsedAmount, useMoneyDisplay } from '@appServices/utilities/money';

const nullFunc = (args?: any) => {};

interface CurrencyInputProps {
	amount: string | number;
	id: string;
	onChange?: (result?: { amount: string | number; id: string }) => void;
	placeholder?: string;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	wrapperProps?: React.HTMLAttributes<Element>;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
	amount = 0,
	id = '',
	onChange = nullFunc,
	tag = 'p',
	wrapperProps = {},
}) => {
	const { formatAmount, beforeAmount, afterAmount } = useMoneyDisplay();
	const before = beforeAmount ? <span className={'ee-currency-input__before-amount'}>{beforeAmount} </span> : '';
	const after = afterAmount ? <span className={'ee-currency-input__after-amount'}> {afterAmount}</span> : '';
	const formattedAmount = formatAmount(amount);
	const Wrapper = tag;

	const onChangeHandler = useCallback(
		(value: string) => {
			const newAmount = parsedAmount(value);
			if (newAmount !== amount) {
				onChange({ amount: newAmount, id });
			}
		},
		[onChange]
	);

	return (
		<Wrapper className={'ee-currency-input'} {...wrapperProps}>
			{before}
			<InlineEditText
				as='span'
				fitText={false}
				key={id}
				onChangeValue={onChangeHandler}
				value={formattedAmount}
			/>
			{after}
		</Wrapper>
	);
};

export default CurrencyInput;
