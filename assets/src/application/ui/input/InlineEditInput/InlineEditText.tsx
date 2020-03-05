import React from 'react';

import Editable from './Editable';
import { TextProps } from './types';

const InlineEditText: React.FC<TextProps> = ({ ...rest }) => {
	return <Editable inputType='text' ellipsis {...rest} />;
};

export default InlineEditText;
