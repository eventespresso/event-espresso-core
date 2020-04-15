import React, { useCallback } from 'react';
import classNames from 'classnames';

import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { Editable, EditablePreviewProps } from '@infraUI/inputs';
import { TextProps } from './types';
import { isInfinite } from '@application/services';

const Preview: React.FC<EditablePreviewProps> = ({ value, onRequestEdit, isEditing }) => {
	const isInfinity = isInfinite(value);
	const classeName = classNames({
		'ee-infinity-sign': isInfinity,
	});

	if (isEditing) {
		return null;
	}
	let output = isInfinity ? '∞' : value;
	return (
		<span className={classeName} onClick={onRequestEdit}>
			{output}
		</span>
	);
};

const InlineEditInfinity: React.FC<TextProps> = ({ onChangeValue, value, ...rest }) => {
	const isInfinity = isInfinite(value);

	const onChangeHandler = useCallback<TextProps['onChangeValue']>(
		(val) => {
			const parsedValue = parseInfinity(val);
			if (typeof onChangeValue === 'function') {
				onChangeValue(parsedValue);
			}
		},
		[onChangeValue]
	);

	return (
		<Editable
			{...rest}
			inputType='text'
			onChangeValue={onChangeHandler}
			placeholder=''
			Preview={Preview}
			value={isInfinity ? '' : value}
		/>
	);
};

export default InlineEditInfinity;
