import React from 'react';
import { Field as RFFField } from 'react-final-form';

import { FieldProps } from '../types';
import FieldRenderer from '../renderers/FieldRenderer';
import useShouldBeVisible from '../hooks/useShouldBeVisible';

const Field: React.FC<FieldProps> = ({ conditions, ...rest }) => {
	const visible = useShouldBeVisible(conditions, rest.name);

	return visible && <RFFField render={FieldRenderer} {...rest} />;
};

export default Field;
