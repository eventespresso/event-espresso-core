import React from 'react';

import { RenderFieldsProps } from './types';
import RenderField from './RenderField';

const RenderFields: React.FC<RenderFieldsProps> = ({ fields, namespace }) => {
	return (
		<div>
			{fields.map(({ name, ...fieldProps }, key) => {
				const fieldName = namespace ? `${namespace}.${name}` : name;
				return <RenderField key={key} {...fieldProps} name={fieldName} />;
			})}
		</div>
	);
};

export default RenderFields;
