import React from 'react';

import Editable from './Editable';
import { TextAreaProps } from './types';

const InlineEditTextArea: React.FC<TextAreaProps> = ({ ellipsis, ...rest }) => {
	ellipsis = ellipsis ? ellipsis : { rows: 2, expandable: true };
	return <Editable inputType='textarea' ellipsis={ellipsis} {...rest} />;
};

export default InlineEditTextArea;
