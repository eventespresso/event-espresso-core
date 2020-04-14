import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Editable, EditableInputProps } from '@infraUI/inputs';
import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { TextProps } from './types';

const InlineEditInfinity: React.FC<TextProps> = (props) => {
	const [value, setValue] = useState(props.value);

	// if value updated by parent
	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	const onSubmit: TextProps['onSubmit'] = (val) => {
		const parsedValue = parseInfinity(val);
		setValue(parsedValue);

		if (typeof props.onSubmit === 'function') {
			props.onSubmit(`${parsedValue}`);
		}
	};

	const output: string = value < 0 ? '∞' : String(value);
	const className = classNames(props.className, {
		'ee-infinity-sign': output === '∞',
	});

	const editableInputProps: EditableInputProps = {
		as: 'input',
		type: 'text',
	};

	return (
		<Editable
			className={className}
			defaultValue={output}
			editableInputProps={editableInputProps}
			onSubmit={onSubmit}
		/>
	);
};

export default InlineEditInfinity;
