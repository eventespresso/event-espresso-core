import React from 'react';
import classNames from 'classnames';

import { StepProps } from './types';

const Step: React.FC<StepProps> = ({ active, className, disabled, icon: Icon, showStepNumber, stepNumber, title }) => {
	const newClassName = classNames('ee-steps__step', className, {
		active,
		disabled,
	});
	return (
		<div className={newClassName}>
			{Icon && <Icon />}
			{showStepNumber && stepNumber}{' '}
			{title || stepNumber}
		</div>
	);
};

export default Step;
