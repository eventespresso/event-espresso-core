import React from 'react';

import { TextProps } from './types';
import { Editable } from '@infraUI/inputs';

const InlineEditText: React.FC<TextProps> = ({ placeholder = '', tag: as, ...props }) => {
	return <Editable {...props} as={as} inputType='text' placeholder={placeholder} />;
};

export default InlineEditText;
