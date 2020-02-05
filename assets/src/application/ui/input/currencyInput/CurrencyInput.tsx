// @ts-nocheck
import React, { useState } from 'react';
import Currency from '../../../../domain/eventEditor/ui/datetimes/dateForm/node_modules/react-currency-formatter';
import { Button, EditableText } from '@blueprintjs/core/lib/esm';
import InlineEditInput from '../inlineEditInput/InlineEditInput';

const nullFunc = (args?: any) => {};

const btnStyle = {
	margin: '0 0 0 .5rem',
};

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
			<Button icon='edit' onClick={() => setEditing(true)} style={btnStyle} minimal />
		</>
	);
};

export default CurrencyInput;
