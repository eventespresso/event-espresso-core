import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';

import { StepsProps } from './types';
import './style.scss';

const Steps: React.FC<StepsProps> = ({ className, children, current = 0, initial = 0, showStepNumber }) => {
	const newClassName = classNames('ee-steps', className);
	return (
		<div className={newClassName}>
			{Children.map(children, (child: any, index) => {
				const stepNumber = initial + index;
				const childProps = {
					stepNumber: `${stepNumber + 1}`,
					stepIndex: stepNumber,
					active: stepNumber === current,
					showStepNumber
				};
				return cloneElement(child, childProps);
			})}
		</div>
	);
};

export default Steps;
