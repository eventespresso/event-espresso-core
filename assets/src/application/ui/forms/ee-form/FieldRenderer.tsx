import React from 'react';

import { FormItem, MappedField } from './adapters';
import { FieldRendererProps } from './types';
import { getValidateStatus } from './utils';

const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
	const { label, desc, meta, before, after, fieldType } = props;

	const validateStatus = getValidateStatus(meta);
	return (
		<FormItem
			label={label}
			extra={desc}
			validateStatus={validateStatus}
			hasFeedback={meta.touched && !!(meta.error || meta.submitError)}
			help={meta.touched && (meta.error || meta.submitError)}
			className={`form-item form-item-${fieldType}`}
		>
			{before}
			<MappedField {...props} />
			{after}
		</FormItem>
	);
};
export default FieldRenderer;
