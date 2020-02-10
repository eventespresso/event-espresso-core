import React from 'react';

import { RenderFieldProps } from './types';
import { Field, Group, Repeatable } from './fields';

const RenderField: React.FC<RenderFieldProps> = (props) => {
	const { fieldType } = props;
	if (!fieldType) {
		return null;
	}

	const { repeatable, ...rest } = props;

	if (repeatable) {
		return <Repeatable {...rest} />;
	}
	if (fieldType === 'group') {
		return <Group {...rest} />;
	}
	return <Field {...rest} />;
};

export default RenderField;
