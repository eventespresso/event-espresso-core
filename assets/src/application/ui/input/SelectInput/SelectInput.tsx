import React from 'react';
import { ENTER } from '@wordpress/keycodes';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { Select } from 'antd';

import { withLabel, withLabelProps, withTooltipProps } from '@appDisplay/index';

interface SelectInputProps extends SelectProps<SelectValue>, Partial<withLabelProps>, Partial<withTooltipProps> {}

const SelectInput: React.FC<SelectInputProps> = React.memo(({ id, ...rest }) => {
	const htmlId = id ? `ee-select-input-${id}` : null;
	const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.keyCode === ENTER && e.preventDefault();

	return (
		<Select id={htmlId} size='middle' dropdownMatchSelectWidth={true} onInputKeyDown={onInputKeyDown} {...rest} />
	);
});

export default withLabel(SelectInput);
