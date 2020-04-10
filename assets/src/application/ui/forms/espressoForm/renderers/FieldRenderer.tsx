import React from 'react';
import classNames from 'classnames';
import { Icon } from '@chakra-ui/core';

import { FieldRendererProps } from '../types';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@infraUI/forms';
import { MappedField } from '../adapters';
import { Tooltip } from '@infraUI/display';

const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
	const { after, before, desc, formControlProps, info, label, required, ...rest } = props;

	const { meta } = props;

	// no layout stuff needed for hidden field
	if (props.fieldType === 'hidden') {
		return <MappedField {...rest} />;
	}

	const tooltipKey = info ? props.input.name + '-tooltip' : null;

	const errorMessage = meta.touched && (meta.error || meta.submitError);

	return (
		<FormControl
			isInvalid={Boolean(errorMessage)}
			isRequired={required}
			className={classNames('form-item', `form-item-${rest.fieldType}`, formControlProps?.className)}
		>
			<FormLabel htmlFor={props.input.name}>
				{label}
				{info && (
					<Tooltip placement='right' title={info}>
						<Icon marginLeft='var(--ee-margin-micro)' name='info-outline' />
					</Tooltip>
				)}
			</FormLabel>
			{before}
			<MappedField aria-label={label} aria-describedby={tooltipKey} {...rest} />
			{after}
			{errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
			<FormHelperText>{desc}</FormHelperText>
		</FormControl>
	);
};
export default FieldRenderer;
