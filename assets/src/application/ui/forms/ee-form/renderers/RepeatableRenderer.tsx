import React from 'react';
import { __, sprintf } from '@wordpress/i18n';

import { Button } from '../adapters';
import { RepeatableRendererProps } from '../types';
import { Field, Group } from '../fields';

const RepeatableRenderer: React.FC<Omit<RepeatableRendererProps, 'component'>> = ({
	fields,
	fieldType,
	label,
	...rest
}) => {
	const Component = fieldType === 'group' ? Group : Field;
	return (
		<>
			<div>
				<h4>{label}</h4>
			</div>
			{fields.map((fieldName: string, index: number) => {
				return (
					<div key={fieldName + index} className='repeatable-item'>
						<Component
							{...rest}
							fieldType={fieldType}
							name={fieldName}
							label={
								<>
									{sprintf(__('Entry %d'), index + 1)}
									&nbsp;
									<Button
										className='remove-item'
										shape='circle'
										size='small'
										icon='close'
										type='danger'
										onClick={() => fields.remove(index)}
									/>
								</>
							}
						/>
					</div>
				);
			})}
			<Button className='add-item' onClick={() => fields.push(undefined)}>
				{__('Add')}
			</Button>
		</>
	);
};
export default RepeatableRenderer;
