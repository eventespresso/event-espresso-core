import React from 'react';
import { ENTER } from '@wordpress/keycodes';
import { Select } from 'antd';
import { SelectProps } from './types';

const SelectField: React.FC<SelectProps> = ({ input, mode, options, ...selectProps }) => {
	const children = options.map(({ optgroup, options: optionGroups = [], label, ...optionProps }, index) => {
		if (optgroup && optionGroups.length) {
			return (
				<Select.OptGroup label={optgroup} key={`${optgroup}${index}`}>
					{optionGroups.map(({ label: optLabel, value, ...opts }, i) => (
						<Select.Option {...opts} value={value} key={`${value}${i}`}>
							{optLabel}
						</Select.Option>
					))}
				</Select.OptGroup>
			);
		}
		return (
			<Select.Option {...optionProps} value={optionProps.value} key={`${optionProps.value}${index}`}>
				{label}
			</Select.Option>
		);
	});

	const onInputKeyDown = (e) => e.keyCode === ENTER && e.preventDefault();
	// make sure the value is an array when mode is "multiple"
	const value = mode === 'multiple' ? input.value || [] : input.value;

	return (
		<Select {...input} {...selectProps} mode={mode} onInputKeyDown={onInputKeyDown} value={value}>
			{children}
		</Select>
	);
};

export default SelectField;
