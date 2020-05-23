import React from 'react';
import classNames from 'classnames';

import { StepProps } from './types';

const Step: React.FC<StepProps> = ({
	active,
	description = '',
	icon: Icon,
	orientation = 'inline',
	showStepNumber,
	stepNumber,
	stepState,
	title,
	...props
}) => {
	const className = classNames(
		props.className,
		'ee-form-step',
		`ee-form-step--${orientation}`,
		stepState && `ee-form-step--${stepState}`,
		!Icon && 'ee-form-step--no-icon',
		active && 'ee-form-step--active'
	);

	return (
		<li className={className}>
			{showStepNumber && <div className={'ee-form-step__number'}>{stepNumber}</div>}
			{Icon && (
				<div className={'ee-form-step__icon'}>
					<Icon />
				</div>
			)}
			<div className={'ee-form-step__content'}>
				{title && <div className={'ee-form-step__title'}>{title}</div>}
				{description && <div className={'ee-form-step__desc'}>{description}</div>}
			</div>
		</li>
	);
};

export default Step;
