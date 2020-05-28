import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { Heading } from '@infraUI/display';
import { StepsProps } from './types';
import { useMemoStringify } from '@application/services/hooks';
import './style.scss';

const Steps: React.FC<StepsProps> = ({
	children,
	current = 0,
	initial = 0,
	orientation = 'inline',
	showStepNumber,
	...props
}) => {
	const wrapperClassName = classNames(props.className, 'ee-form-steps__wrapper');

	const listClassName = classNames('ee-form-steps', `ee-form-steps--${orientation}`);

	const heading = props.heading ?? __('Steps');

	const headingMarginBottom = useMemoStringify({ base: 4, md: 0 });

	return (
		<div className={wrapperClassName}>
			<Heading as='h3' mb={headingMarginBottom}>
				{heading}
			</Heading>
			<ul className={listClassName}>
				{Children.map(children, (child: any, index) => {
					const stepNumber = initial + index;
					const childProps = {
						stepNumber: `${stepNumber + 1}`,
						stepIndex: stepNumber,
						active: stepNumber === current,
						showStepNumber,
						...props,
					};
					return cloneElement(child, childProps);
				})}
			</ul>
		</div>
	);
};

export default Steps;
