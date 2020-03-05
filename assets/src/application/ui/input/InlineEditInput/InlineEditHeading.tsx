import React from 'react';

import Editable from './Editable';
import { HeadingProps } from './types';

const InlineEditHeading: React.FC<HeadingProps> = ({ ellipsis, ...rest }) => {
	ellipsis = ellipsis ? ellipsis : { rows: 1, expandable: false };
	return <Editable inputType='heading' ellipsis={ellipsis} level={4} {...rest} />;
};

export default InlineEditHeading;
