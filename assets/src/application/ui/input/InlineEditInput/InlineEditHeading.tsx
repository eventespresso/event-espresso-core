import React from 'react';

import { HeadingProps } from './types';
import { Editable } from '@infraUI/inputs';

const InlineEditHeading: React.FC<HeadingProps> = ({ ...rest }) => {
	return <Editable placeholder='' as='h4' {...rest} inputType='heading' />;
};

export default InlineEditHeading;
