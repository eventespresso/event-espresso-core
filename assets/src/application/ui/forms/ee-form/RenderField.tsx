import React from 'react';

import { RenderFieldProps } from './types';
import FormField from './FormField';

const RenderField: React.FC<RenderFieldProps> = (props) => {
	if (!props.fieldType) {
		return null;
	}
	return <FormField {...props} />;
};

export default RenderField;
