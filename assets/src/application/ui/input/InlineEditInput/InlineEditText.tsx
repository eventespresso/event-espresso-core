import React from 'react';

import Editable from './Editable';
import { TextProps } from './types';

const InlineEditText: React.FC<TextProps> = ({ ellipsis = true, ...rest }) => {
	return <Editable {...rest} ellipsis={ellipsis} inputType='text' />;
};

export default InlineEditText;
