import React from 'react';

import Editable from './Editable';
import { HeadingProps } from './types';

const InlineEditHeading: React.FC<HeadingProps> = ({ ...rest }) => {
	return <Editable inputType='heading' level={4} {...rest} />;
};

export default InlineEditHeading;
