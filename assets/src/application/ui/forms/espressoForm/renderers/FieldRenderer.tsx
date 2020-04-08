import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { MappedField } from '../adapters';
import { FieldRendererProps } from '../types';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@infraUI/forms';

const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
	const { after, before, desc, formControlProps, info, label, required, ...rest } = props;

	const { meta } = props;

	// no layout stuff needed for hidden field
	if (props.fieldType === 'hidden') {
		return <MappedField {...rest} />;
	}

	const tooltipKey = info ? props.input.name + '-tooltip' : null;

	const fieldInfo = info ? (
		<span id={tooltipKey}>
			<Tooltip placement='right' title={info}>
				<InfoCircleOutlined className='tooltip' />
			</Tooltip>
		</span>
	) : null;

	const errorMessage = meta.touched && (meta.error || meta.submitError);

	return (
		<FormControl
			isInvalid={Boolean(errorMessage)}
			isRequired={required}
			className={classNames('form-item', `form-item-${rest.fieldType}`, formControlProps?.className)}
		>
			<FormLabel htmlFor={props.input.name}>
				{label}
				{fieldInfo}
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
