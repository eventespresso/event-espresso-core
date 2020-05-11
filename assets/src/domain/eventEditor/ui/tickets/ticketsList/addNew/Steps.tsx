import React from 'react';
import { __ } from '@wordpress/i18n';

import { Steps as StepsAdapter, Step } from '@infraUI/display/steps';
import { PrevNext } from '@application/services/hooks/usePrevNext';

const Steps: React.FC<Pick<PrevNext, 'current'>> = ({ current }) => {
	return (
		<StepsAdapter current={current} showStepNumber>
			<Step title={__('Details')} />
			<Step title={__('Assign Dates')} />
		</StepsAdapter>
	);
};

export default Steps;
