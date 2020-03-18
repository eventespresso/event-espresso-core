import React from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';

import { EditableProps } from './types';

import './style.scss';

const { Text, Title, Paragraph } = Typography;

const EditableTypes = {
	text: Text,
	heading: Title,
	textarea: Paragraph,
};
// Leave `ellipsis` unused to avoid TS conflict
/* eslint-disable no-unused-vars */
const Editable: React.FC<EditableProps> = ({ inputType, ellipsis, onChange, className, ...rest }) => {
	const Component = EditableTypes[inputType];

	const htmlClasses = classNames('ee-inline-edit', `ee-inline-edit-${inputType}`, className);

	return <Component className={htmlClasses} editable={{ onChange }} ellipsis={ellipsis} tabIndex={0} {...rest} />;
};

export default Editable;
