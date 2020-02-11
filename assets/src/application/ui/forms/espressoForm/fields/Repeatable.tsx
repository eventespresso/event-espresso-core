import React from 'react';
import { FieldArray } from 'react-final-form-arrays';

import { FieldProps } from '../types';
import RepeatableRenderer from '../renderers/RepeatableRenderer';
import useShouldBeVisible from '../hooks/useShouldBeVisible';

const Repeatable: React.FC<Omit<FieldProps, 'component'>> = ({ name, conditions, ...rest }) => {
	const visible = useShouldBeVisible(conditions, name);
	return (
		visible && (
			<div className='repeatable-wrap'>
				<FieldArray {...rest} name={name} render={RepeatableRenderer} />
			</div>
		)
	);
};

export default Repeatable;
