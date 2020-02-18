import React from 'react';
import { TextProps } from 'antd/es/typography/Text';

import Editable from './Editable';

const InlineEditText: React.FC<TextProps> = ({ ...rest }) => {
	return <Editable inputType='text' ellipsis {...rest} />;
};

export default InlineEditText;
