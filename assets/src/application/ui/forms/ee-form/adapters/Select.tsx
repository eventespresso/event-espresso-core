import React from 'react';
import { Select } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { SelectProps } from './types';

const SelectField: React.FC<SelectProps> = ({ input, mode, options, ...restProps }) => {
	const children = options.map(({ optgroup, options: optionGroups = [], value, label, ...rest }) => {
		if (optgroup) {
			return (
				<Select.OptGroup label={optgroup} key={optgroup}>
					{optionGroups.map((props) => (
						<SelectOption {...props} />
					))}
				</Select.OptGroup>
			);
		}
		return <SelectOption key={value} value={value} label={label} {...rest} />;
	});
	return (
		<Select {...input} {...restProps} mode={mode}>
			{children}
		</Select>
	);
};

const SelectOption: React.FC<OptionProps> = ({ value, label, ...rest }) => (
	<Select.Option key={value} value={value} {...rest}>
		{label}
	</Select.Option>
);

export default SelectField;
