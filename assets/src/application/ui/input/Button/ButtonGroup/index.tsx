import React, { cloneElement } from 'react';
import classNames from 'classnames';

import { ButtonGroup as ButtonGroupAdapter } from '@infraUI/inputs';
import { ButtonGroupProps } from './types';
import { cleanChildren } from './utils';

import './style.scss';

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttonSize, children, ...props }) => {
	const className = classNames(props.className, 'ee-btn-group');
	const validChildren = cleanChildren(children);
	const clones = validChildren.map((child, index) => {
		const isFirst = index === 0;
		const isLast = index === validChildren.length - 1;

		// @ts-ignore
		return cloneElement(child, {
			// @ts-ignore
			buttonSize: buttonSize || child.props.buttonSize,

			// @ts-ignore
			...(isFirst && { className: classNames(child.props.className, 'ee-btn--first') }),
			// @ts-ignore
			...(isLast && { className: classNames(child.props.className, 'ee-btn--last') }),
			// @ts-ignore
			...(!isFirst && !isLast && { className: classNames(child.props.className, 'ee-btn--no-border-radius') }),
		});
	});

	return (
		<ButtonGroupAdapter {...props} className={className}>
			{clones}
		</ButtonGroupAdapter>
	);
};

export default ButtonGroup;
