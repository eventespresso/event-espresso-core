import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Select as ChakraSelect } from '@chakra-ui/core';

import type { SelectProps } from './types';

const Select: React.FC<SelectProps> = ({ children, options = [], onChange, onChangeValue, ...props }) => {
	const className = classNames(props.className, 'ee-input-base ee-select');
	const childNodes =
		children ||
		options.map(({ label, options: optionGroups, value, ...optionProps }, index) => {
			if (optionGroups?.length && label) {
				return (
					<optgroup label={label as string} key={`${label}${index}`} {...optionProps}>
						{optionGroups.map(({ label: optLabel, value, ...optProps }, i) => (
							<option {...optProps} value={value} key={`${value}${i}`}>
								{optLabel}
							</option>
						))}
					</optgroup>
				);
			}
			return (
				<option {...optionProps} value={value} key={`${value}${index}`}>
					{label}
				</option>
			);
		});

	const onChangeHandler: SelectProps['onChange'] = useCallback(
		(event) => {
			if (typeof onChangeValue === 'function') {
				onChangeValue(event.target.value, event);
			}

			if (typeof onChange === 'function') {
				onChange(event);
			}
		},
		[onChange, onChangeValue]
	);

	return (
		<ChakraSelect
			// fix the double icon issue
			icon={() => null}
			{...props}
			className={className}
			onChange={onChangeHandler}
		>
			{childNodes}
		</ChakraSelect>
	);
};

export default Select;
