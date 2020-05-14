import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { StepsProps } from './types';
import './style.scss';

const Steps: React.FC<StepsProps> = ({
	children,
	current = 0,
	initial = 0,
	showStepNumber,
	vertical = false,
	...props
}) => {
	const wrapperClassName = classNames(props.className, 'ee-form-steps__wrapper');
	const listClassName = classNames('ee-form-steps', {
		'ee-form-steps--vertical': vertical,
		'ee-form-steps--inline': !vertical,
	});
	const heading = props.heading ?? __('Steps');
	return (
		<div className={ wrapperClassName }>
			<h3>{ heading }</h3>
			<ul className={ listClassName }>
				{ Children.map(children, (child: any, index) => {
					const stepNumber = initial + index;
					const childProps = {
						stepNumber: `${stepNumber + 1}`,
						stepIndex: stepNumber,
						active: stepNumber === current,
						showStepNumber,
						...props
					};
					return cloneElement(child, childProps);
				}) }
			</ul>
		</div>
	);
};

export default Steps;
