import React from 'react';
import { __ } from '@wordpress/i18n';

import { Steps, Step } from '@infraUI/display/steps';
import { PrevNext } from '@application/services/hooks/usePrevNext';
import { Calculator, Calendar, Ticket } from '@appDisplay/icons';

const TicketFormSteps: React.FC<Pick<PrevNext, 'current'>> = ({ current }) => {
	return (
		<Steps current={current} showStepNumber>
			<Step description={__('primary information about the ticket')} icon={Ticket} title={__('Ticket Details')} />
			<Step
				description={__('apply ticket price modifiers and taxes')}
				icon={Calculator}
				title={__('Price Calculator')}
			/>
			<Step description={__('relations between tickets and dates')} icon={Calendar} title={__('Assign Dates')} />
		</Steps>
	);
};

export default TicketFormSteps;
