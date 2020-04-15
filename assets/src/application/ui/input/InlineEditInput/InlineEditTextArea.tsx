import React from 'react';

import { TextAreaProps } from './types';
import { Editable } from '@infraUI/inputs';

const InlineEditTextArea: React.FC<TextAreaProps> = ({ ...rest }) => {
	return <Editable placeholder='' {...rest} inputType='textarea' />;
};

export default InlineEditTextArea;
