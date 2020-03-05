import React from 'react';
import { TextProps } from './types';

import Editable from './Editable';

const InlineEditText: React.FC<TextProps> = ({ ellipsis = true, ...rest }) => {
	return <Editable inputType='text' ellipsis={ellipsis} {...rest} />;
};

export default InlineEditText;
