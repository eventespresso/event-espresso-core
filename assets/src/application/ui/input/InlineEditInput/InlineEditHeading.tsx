import React from 'react';

import Editable from './Editable';
import { HeadingProps } from './types';

const InlineEditHeading: React.FC<HeadingProps> = ({ ellipsis, level = 4, ...rest }) => {
	const ellipsisOptions = ellipsis ? ellipsis : { rows: 2, expandable: false };
	return <Editable ellipsis={ellipsisOptions} level={level} {...rest} inputType='heading' />;
};

export default InlineEditHeading;
