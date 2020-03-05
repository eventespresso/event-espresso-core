import React from 'react';

import Editable from './Editable';
import { HeadingProps } from './types';

const InlineEditHeading: React.FC<HeadingProps> = ({ ellipsis, level = 4, ...rest }) => {
	const enableEllipsis = ellipsis ? ellipsis : { rows: 1, expandable: false };
	return <Editable inputType='heading' ellipsis={enableEllipsis} level={level} {...rest} />;
};

export default InlineEditHeading;
