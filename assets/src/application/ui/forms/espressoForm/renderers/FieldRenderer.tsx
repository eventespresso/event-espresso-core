import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import uuidv4 from 'uuid/v4';

import { FormItem, MappedField } from '../adapters';
import { FieldRendererProps } from '../types';
import { getValidateStatus } from '../utils';
import useFormItemLayout from '../hooks/useFormItemLayout';

const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
	const { after, before, desc, formItemProps, info, label, meta, required, ...rest } = props;

	const formItemLayout = useFormItemLayout();

	// no layout stuff needed for hidden field
	if (props.fieldType === 'hidden') {
		return <MappedField {...rest} />;
	}

	const tooltipKey = info ? uuidv4() : null;

	const fieldInfo = info ? (
		<Tooltip placement='right' title={info} id={tooltipKey}>
			<InfoCircleOutlined className='tooltip' />
		</Tooltip>
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
