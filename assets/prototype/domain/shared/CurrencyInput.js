import Currency from 'react-currency-formatter';
import { useState } from '@wordpress/element';
import { Button, EditableText } from '@blueprintjs/core/lib/esm';

const nullFunc = () => {};

const btnStyle = {
	margin: '0 0 0 .5rem',
};

const CurrencyInput = ({ id = 0, amount = 0, placeholder = '', onConfirm = nullFunc, onCancel = nullFunc }) => {
	const [editing, setEditing] = useState(false);
	return editing ? (
		<EditableText
			key={id}
			isEditing={editing}
			placeholder={placeholder}
			defaultValue={amount}
			onCancel={() => {
				setEditing(false);
				if (typeof onCancel === 'function') {
					onCancel(id);
				}
			}}
			onConfirm={(amount) => {
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
