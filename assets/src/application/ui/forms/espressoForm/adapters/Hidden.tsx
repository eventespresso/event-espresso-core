import React from 'react';

import { FieldRendererProps } from '../types';

const Hidden: React.FC<FieldRendererProps> = ({ input, meta, ...rest }) => {
	return <input {...input} {...rest} type='hidden' />;
};

export default Hidden;
