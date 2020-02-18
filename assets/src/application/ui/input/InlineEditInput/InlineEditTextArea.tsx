import React from 'react';

import Editable from './Editable';
import { TextAreaProps } from './types';

const InlineEditTextArea: React.FC<TextAreaProps> = ({ ...rest }) => {
	return <Editable inputType='textarea' ellipsis={{ rows: 3, expandable: true }} {...rest} />;
};

export default InlineEditTextArea;
