import React from 'react';
import { Field as RFFField } from 'react-final-form';

import { FieldProps } from '../types';
import FieldRenderer from '../renderers/FieldRenderer';
import useShouldBeVisible from '../hooks/useShouldBeVisible';
import { parseInfinity, formatInfinity } from '@appServices/utilities/number';

type RFFFieldProps = Partial<React.ComponentProps<typeof RFFField>>;

const Field: React.FC<FieldProps> = ({ conditions, parseAsInfinity, ...rest }) => {
	const visible = useShouldBeVisible(conditions, rest.name);

	const extraProps: RFFFieldProps = parseAsInfinity
		? {
				// `format` will convert infinite value from form (like -1) to empty string
				// before it gets passed to the input
				format: (value: number) => formatInfinity(value),
				// `parse` will convert empty string from the field to infinite value (like -1)
				// before it is added to form values object
				parse: (value: any) => parseInfinity(value),
		  }
		: {};

	return visible && <RFFField render={FieldRenderer} {...extraProps} {...rest} type={rest.fieldType} />;
};

export default Field;
