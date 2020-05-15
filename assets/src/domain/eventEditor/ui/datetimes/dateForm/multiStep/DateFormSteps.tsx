import React from 'react';
import { __ } from '@wordpress/i18n';

import { Steps, Step } from '@infraUI/display/steps';
import { PrevNext } from '@application/services/hooks/usePrevNext';
import { Calendar, Ticket } from '@appDisplay/icons';

const DatetimeFormSteps: React.FC<Pick<PrevNext, 'current'>> = ({ current }) => {
	return (
		<Steps current={current} showStepNumber>
			<Step title={__('Date Details')} description={__('primary information about the date')} icon={Calendar} />
			<Step title={__('Assign Tickets')} description={__('relations between tickets and dates')} icon={Ticket} />
		</Steps>
	);
};

export default DatetimeFormSteps;
