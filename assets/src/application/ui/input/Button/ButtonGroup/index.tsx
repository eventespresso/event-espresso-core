import React from 'react';
import classNames from 'classnames';

import { ButtonGroup as ButtonGroupAdapter, ButtonGroupProps } from '@infraUI/inputs';

import './style.scss';

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, ...props }) => {
	const className = classNames(props.className, 'ee-btn-group');

	return (
		<ButtonGroupAdapter {...props} className={className}>
			{children}
		</ButtonGroupAdapter>
	);
};

export default ButtonGroup;
