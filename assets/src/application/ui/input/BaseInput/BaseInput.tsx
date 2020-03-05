import React from 'react';
import classnames from 'classnames';

import './style.scss';

interface BaseInputProps {
	id?: string;
	label?: string;
	className?: string;
	children?: React.ReactNode;
}

const BaseInput: React.FC<BaseInputProps> = ({ id, label, className, children }) => {
	return (
		<div className={classnames('ee-base-input', className)}>
			<div className='ee-base-input-field'>
				{label && (
					<label className='ee-base-input-label' htmlFor={id}>
						{label}
					</label>
				)}
				{children}
			</div>
		</div>
	);
};

export default BaseInput;
