import React from 'react';

import { InlineEdit } from '@infraUI/inputs';
import Preview from './Preview';
import { TextAreaProps } from '../types';

const InlineEditTextArea: React.FC<TextAreaProps> = ({ tooltip, ...props }) => {
	const preview = (previewProps) => <Preview {...previewProps} tooltip={tooltip} />;
	return <InlineEdit placeholder='' {...props} inputType='textarea' Preview={preview} />;
};

export default InlineEditTextArea;
