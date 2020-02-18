import React from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';

import './style.css';
import { EditableProps } from './types';

const { Text, Title, Paragraph } = Typography;

const EditableTypes = {
	text: Text,
	heading: Title,
	textarea: Paragraph,
};

const Editable = ({ inputType, onChange, ellipsis, className, ...rest }: EditableProps) => {
	const Component = EditableTypes[inputType];

	const htmlClasses = classNames('ee-inline-edit', `ee-inline-edit-${inputType}`, className);

	return (
		<Component
			className={htmlClasses}
			editable={{
				onChange,
			}}
			{...rest}
		/>
	);
};

export default Editable;
