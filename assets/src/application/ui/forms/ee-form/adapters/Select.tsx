import React from 'react';
import { Select } from 'antd';
import { SelectProps } from './types';

const SelectField: React.FC<SelectProps> = ({ input, mode, options, ...selectProps }) => {
	const children = options.map(({ optgroup, options: optionGroups = [], label, ...optionProps }) => {
		if (optgroup && optionGroups.length) {
			return (
				<Select.OptGroup label={optgroup} key={optgroup}>
					{optionGroups.map(({ value, label: optLabel, ...opts }) => (
						<Select.Option key={value} {...opts}>
							{optLabel}
						</Select.Option>
					))}
				</Select.OptGroup>
			);
		}
		return (
			<Select.Option key={optionProps.value} {...optionProps}>
				{label}
			</Select.Option>
		);
	});
	return (
		<Select {...input} {...selectProps} mode={mode}>
			{children}
		</Select>
	);
};

export default SelectField;
