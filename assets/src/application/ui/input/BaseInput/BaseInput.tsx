import React from 'react';
import classNames from 'classnames';

import './style.scss';

interface BaseInputProps {
	id?: string;
	label?: string;
	className?: string;
	children?: React.ReactNode;
}

const BaseInput: React.FC<BaseInputProps> = ({ children, className, id, label }) => {
	return (
		<div className={classNames('ee-base-input', className)}>
			{label && (
				<label className='ee-base-input-label' htmlFor={id}>
					{label}
				</label>
			)}
			{children}
		</div>
	);
};

export default BaseInput;
