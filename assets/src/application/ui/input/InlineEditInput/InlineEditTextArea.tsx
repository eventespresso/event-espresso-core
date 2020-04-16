import React from 'react';

import { TextAreaProps } from './types';
import { InlineEdit } from '@infraUI/inputs';

const InlineEditTextArea: React.FC<TextAreaProps> = ({ ...rest }) => {
	return <InlineEdit placeholder='' {...rest} inputType='textarea' />;
};

export default InlineEditTextArea;
