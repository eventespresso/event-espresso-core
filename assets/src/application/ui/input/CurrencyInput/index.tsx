// @ts-nocheck
import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import { EditableText } from '@blueprintjs/core/lib/esm';

import { EspressoButton } from '@application/ui/input';
import InlineEditInput from '../InlineEditInput';

const nullFunc = (args?: any) => {};

interface CurrencyInputProps {
	id: string;
	amount: string | number;
	placeholder?: string;
	onConfirm?: (result?: { amount: string | number; id: string }) => void;
	onCancel?: (id?: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
	id = '',
	amount = 0,
	placeholder = '',
	onConfirm = nullFunc,
	onCancel = nullFunc,
}) => {
	const [editing, setEditing] = useState(false);
	return editing ? (
		<InlineEditInput
			component={EditableText}
			key={id}
			isEditing={editing}
			placeholder={placeholder}
			defaultValue={amount}
			value={amount}
			onCancel={() => {
				setEditing(false);
				if (typeof onCancel === 'function') {
					onCancel(id);
				}
			}}
			onConfirm={(amount: string) => {
				setEditing(false);
				onConfirm({ amount, id });
			}}
			selectAllOnFocus
		/>
	) : (
		<>
			<Currency quantity={amount} />
			<EspressoButton icon='edit' onClick={() => setEditing(true)} />
		</>
	);
};

export default CurrencyInput;
