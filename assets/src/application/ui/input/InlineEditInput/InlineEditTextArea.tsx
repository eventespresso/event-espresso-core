import React from 'react';

import Editable from './Editable';
import { TextAreaProps } from './types';

const InlineEditTextArea: React.FC<TextAreaProps> = ({ ellipsis, ...rest }) => {
	const ellipsisOptions = ellipsis ? ellipsis : { rows: 3, expandable: true };
	return <Editable ellipsis={ellipsisOptions} {...rest} inputType='textarea' />;
};

export default InlineEditTextArea;
