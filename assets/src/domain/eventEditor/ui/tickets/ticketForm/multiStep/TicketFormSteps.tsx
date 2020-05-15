import React from 'react';
import { __ } from '@wordpress/i18n';

import { Steps, Step } from '@infraUI/display/steps';
import { PrevNext } from '@application/services/hooks/usePrevNext';
import { Calculator, Calendar, Ticket } from '@appDisplay/icons';

const TicketFormSteps: React.FC<Pick<PrevNext, 'current'>> = ({ current }) => {
	return (
		<Steps current={current} showStepNumber>
			<Step
				title={ __('Ticket Details') }
				description={ __('primary information about the ticket') }
				icon={ Ticket }
			/>
			<Step
				title={ __('Price Calculator') }
				description={ __('apply ticket price modifiers and taxes') }
				icon={ Calculator }
			/>
			<Step
				title={ __('Assign Dates') }
				description={ __('relations between tickets and dates') }
				icon={ Calendar }
			/>
		</Steps>
	);
};

export default TicketFormSteps;
