import React from 'react';
import classNames from 'classnames';

import { StepProps } from './types';

const Step: React.FC<StepProps> = ({
	active,
	description = '',
	disabled,
	icon: Icon,
	showStepNumber,
	stepNumber,
	title,
	vertical = false,
	...props
}) => {
	const className = classNames(
		props.className,
		'ee-form-step',
		{
			'ee-form-step--active': active,
			'ee-form-step--disabled': disabled,
			'ee-form-step--vertical': vertical,
			'ee-form-step--inline': !vertical,
			'ee-form-step--no-icon': !Icon,
		}
	);
	return (
		<li className={ className }>
			{ showStepNumber && <div className={ 'ee-form-step__number' }>{ stepNumber }</div> }
			{ Icon && <div className={ 'ee-form-step__icon' }><Icon /></div> }
			<div className={ 'ee-form-step__content' }>
				{ title && <div className={ 'ee-form-step__title' }>{ title }</div> }
				{ description && <div className={ 'ee-form-step__desc' }>{ description }</div> }
			</div>
		</li>
	);
};

export default Step;
