import React from 'react';

import Editable from './Editable';
import { HeadingProps } from './types';

const InlineEditHeading: React.FC<HeadingProps> = ({ ellipsis, level = 4, ...rest }) => {
	ellipsis = ellipsis ? ellipsis : { rows: 1, expandable: false };
	return <Editable inputType='heading' ellipsis={ellipsis} level={level} {...rest} />;
};

export default InlineEditHeading;
