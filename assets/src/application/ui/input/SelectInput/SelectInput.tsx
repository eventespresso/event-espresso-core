import React from 'react';
import { ENTER } from '@wordpress/keycodes';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { Select } from 'antd';

import { BaseInput } from '../BaseInput';

interface SelectInputProps extends SelectProps<SelectValue> {
	label: string;
}

const SelectInput: React.FC<SelectInputProps> = React.memo(({ id, label, className, ...rest }) => {
	const htmlId = id ? `ee-select-input-${id}` : null;
	const onInputKeyDown = (e) => e.keyCode === ENTER && e.preventDefault();

	return (
		<BaseInput label={label} id={htmlId} className={className}>
			<Select
				id={htmlId}
				size='middle'
				dropdownMatchSelectWidth={true}
				onInputKeyDown={onInputKeyDown}
				{...rest}
			/>
		</BaseInput>
	);
});

export default SelectInput;
