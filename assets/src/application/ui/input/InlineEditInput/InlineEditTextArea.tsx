import React from 'react';

import Editable from './Editable';
import { TextAreaProps } from './types';

const InlineEditTextArea: React.FC<TextAreaProps> = ({ ...rest }) => {
	return <Editable inputType='textarea' level={3} ellipsis {...rest} />;
};

export default InlineEditTextArea;
