import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Button, EditableBase, EditableInput } from '@infraUI/inputs';
import parseInfinity from '@appServices/utilities/number/parseInfinity';
import { TextProps } from './types';
import './style.scss';

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
	const className = classNames(props.className, 'ee-inline-edit-infinity', {
		'ee-infinity-sign': output === '∞',
	});

	return (
		<EditableBase className={className} defaultValue={String(value)} onSubmit={onSubmit}>
			{({ isEditing, onRequestEdit }) => (
				<>
					{!isEditing && (
						<Button onClick={onRequestEdit} variant='unstyled'>
							{output}
						</Button>
					)}
					<EditableInput className="'ee-inline-edit-infinity__input" />
				</>
			)}
		</EditableBase>
	);
};

export default InlineEditInfinity;
