import React from 'react';
import { Field } from 'react-final-form';

import { FieldProps } from './types';
import FieldRenderer from './FieldRenderer';

const FormField: React.FC<FieldProps> = ({ id, ...rest }) => {
	return <Field name={id} render={FieldRenderer} {...rest} />;
};

export default FormField;
