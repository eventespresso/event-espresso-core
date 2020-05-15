import React from 'react';
import classNames from 'classnames';

import { FieldRendererProps } from '../types';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@infraUI/forms';
import { InfoCircleOutlined } from '@appDisplay/icons/svgs';
import { MappedField } from '../adapters';
import { Tooltip } from '@infraUI/display';

const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
	const { after, before, description, formControlProps, info, label, required, ...rest } = props;

	const { meta } = props;

	// no layout stuff needed for hidden field
	if (props.fieldType === 'hidden') {
		return <MappedField { ...rest } />;
	}

	const tooltipKey = info ? props.input.name + '-tooltip' : null;

	const isDateOrTimePicker = ['datepicker', 'timepicker'].includes(props.fieldType);

	// since we don't have access to focus event of pickers' input, it will never be touched
	// we still need to be able to show validation error message
	const errorMessage = (meta.touched || isDateOrTimePicker) && (meta.error || meta.submitError);

	return (
		<FormControl
			isInvalid={ Boolean(errorMessage) }
			isRequired={ required }
			className={ classNames('form-item', `form-item-${rest.fieldType}`, formControlProps?.className) }
		>
			<FormLabel htmlFor={ props.input.name }>
				{ label }
				{ info && (
					<Tooltip placement='right' tooltip={ info }>
						<InfoCircleOutlined />
					</Tooltip>
				) }
			</FormLabel>
			{ before }
			<MappedField aria-label={ label } aria-describedby={ tooltipKey } { ...rest } />
			{ after }
			{ errorMessage ? <FormErrorMessage>{ errorMessage }</FormErrorMessage> : null }
			<FormHelperText>{ description }</FormHelperText>
		</FormControl>
	);
};
export default FieldRenderer;
