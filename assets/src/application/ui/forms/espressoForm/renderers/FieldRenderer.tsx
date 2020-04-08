import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import { FormItem, MappedField } from '../adapters';
import { FieldRendererProps } from '../types';
import { getValidateStatus } from '../utils';
import useFormItemLayout from '../hooks/useFormItemLayout';

const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
	const { after, before, desc, formItemProps, info, label, required, ...rest } = props;

	const { meta } = props;

	const formItemLayout = useFormItemLayout();

	// no layout stuff needed for hidden field
	if (props.fieldType === 'hidden') {
		return <MappedField {...rest} />;
	}

	const tooltipKey = info ? uuidv4() : null;

	const fieldInfo = info ? (
		<span id={tooltipKey}>
			<Tooltip placement='right' title={info}>
				<InfoCircleOutlined className='tooltip' />
			</Tooltip>
		</span>
	) : null;

	const validateStatus = getValidateStatus(meta);
	return (
		<FormItem
			label={
				<>
					{label}
					{fieldInfo}
				</>
			}
			htmlFor={props.input.name}
			colon={false}
			extra={desc}
			required={required}
			validateStatus={validateStatus}
			hasFeedback={meta.touched && !!(meta.error || meta.submitError)}
			help={meta.touched && (meta.error || meta.submitError)}
			{...formItemLayout}
			{...formItemProps}
			className={classNames('form-item', `form-item-${rest.fieldType}`, formItemProps?.className)}
		>
			<>
				{before}
				<MappedField aria-label={label} aria-describedby={tooltipKey} {...rest} />
				{after}
			</>
		</FormItem>
	);
};
export default FieldRenderer;
