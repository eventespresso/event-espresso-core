import React from 'react';

import { TextProps } from './types';
import { InlineEdit } from '@infraUI/inputs';

const InlineEditText: React.FC<TextProps> = ({ placeholder = '', tag: as, ...props }) => {
	return <InlineEdit {...props} as={as} placeholder={placeholder} />;
};

export default InlineEditText;
