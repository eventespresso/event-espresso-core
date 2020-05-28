import React from 'react';

import { FieldProps } from '../types';
import Field from './Field';
import FieldRenderer from '../renderers/FieldRenderer';
import useShouldBeVisible from '../hooks/useShouldBeVisible';

const Group: React.FC<FieldProps> = ({ subFields, label, name: groupName, before, after, conditions }) => {
	const visible = useShouldBeVisible(conditions, groupName);
	if (subFields.length && visible) {
		return (
			<div className='field-group-wrapper'>
				<h5>{label}</h5>
				{before}
				<div className='field-group-items'>
					{subFields.map(({ name: fieldname, fieldType, ...props }, i) => {
						const name = `${groupName}.${fieldname}`;
						return (
							<div className='field-group-item' key={name + i}>
								<Field
									component={FieldRenderer}
									{...props}
									fieldType={fieldType}
									name={name}
								/>
							</div>
						);
					})}
				</div>
				{after}
			</div>
		);
	}
	return null;
};

export default Group;
