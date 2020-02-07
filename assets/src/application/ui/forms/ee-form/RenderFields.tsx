import React from 'react';

import { RenderFieldsProps } from './types';
import RenderField from './RenderField';

const RenderFields: React.FC<RenderFieldsProps> = ({ fields }) => {
	return (
		<div>
			{fields.map((field, key) => (
				<RenderField key={key} {...field} />
			))}
		</div>
	);
};

export default RenderFields;
