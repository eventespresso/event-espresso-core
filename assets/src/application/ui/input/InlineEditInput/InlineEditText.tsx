import React from 'react';

import { TextProps } from './types';
import { Editable } from '@infraUI/inputs';

const InlineEditText: React.FC<TextProps> = ({ ...rest }) => {
	return <Editable placeholder='' {...rest} inputType='text' />;
};

export default InlineEditText;
