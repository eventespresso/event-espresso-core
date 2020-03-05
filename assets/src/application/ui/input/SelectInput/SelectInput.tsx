import React from 'react';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { Select } from 'antd';

import { BaseInput } from '../BaseInput';

interface SelectInputProps extends SelectProps<SelectValue> {
	label: string;
}

const SelectInput: React.FC<SelectInputProps> = React.memo(({ id, label, className, ...rest }) => {
	const htmlId = id ? `ee-select-input-${id}` : null;
	return (
		<BaseInput label={label} id={htmlId} className={className}>
			<Select id={htmlId} size='middle' dropdownMatchSelectWidth={true} {...rest} />
		</BaseInput>
	);
});

export default SelectInput;
