import React, { cloneElement } from 'react';
import classNames from 'classnames';

import { ButtonGroup as ButtonGroupAdapter } from '@infraUI/inputs';
import { ButtonGroupProps } from './types';
import { cleanChildren } from './utils';

import './style.scss';

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttonSize, children, ...props }) => {
	const className = classNames(props.className, 'ee-btn-group');
	const validChildren = cleanChildren(children);
	const clones = validChildren.map((child: any) => {
		return cloneElement(child, {
			buttonSize: buttonSize || child.props.buttonSize,
		});
	});

	return (
		<ButtonGroupAdapter {...props} className={className}>
			{clones}
		</ButtonGroupAdapter>
	);
};

export default ButtonGroup;
