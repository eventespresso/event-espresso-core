import React, { useState } from 'react';
import classNames from 'classnames';

import parseInfinity from '@appServices/utilities/number/parseInfinity';
import Editable from './Editable';
import { TextProps } from './types';

const InlineEditInfinity: React.FC<TextProps> = ({ children, onChange, className, ...rest }) => {
	const [value, setValue] = useState(children);
	const [isEditing, setIsEditing] = useState(false);

	const editable: TextProps['editable'] = {
		editing: isEditing,
		onChange: (val) => {
			const parsedValue = parseInfinity(val);
			setValue(parsedValue);
			setIsEditing(false);
			if (typeof onChange === 'function') {
				onChange(`${parsedValue}`);
			}
		},
		onStart: () => setIsEditing(true),
	};

	let output: string;
	switch (true) {
		case isEditing && value < 0:
			output = '';
			break;
		case !isEditing && value < 0:
			output = '∞';
			break;
		default:
			output = `${value}`;
			break;
	}
	const htmlClasseName = classNames({
		className,
		'ee-infinity-sign': output === '∞',
	});

	return (
		<Editable {...rest} editable={editable} inputType='text' className={htmlClasseName}>
			{output}
		</Editable>
	);
};

export default InlineEditInfinity;
