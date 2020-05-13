import React from 'react';
import { __ } from '@wordpress/i18n';

import { Steps, Step } from '@infraUI/display/steps';
import { PrevNext } from '@application/services/hooks/usePrevNext';
// import { ProfileOutlined } from '@appDisplay/icons/svgs';
import { Calendar, Ticket } from '@appDisplay/icons';

const AddNewTicketSteps: React.FC<Pick<PrevNext, 'current'>> = ({ current }) => {
	return (
		<Steps current={ current } showStepNumber>
			<Step
				title={ __('Ticket Details') }
				description={ __('primary information about the ticket') }
				icon={ Ticket }
			/>
			<Step
				title={ __('Assign Dates') }
				description={ __('which dates this ticket will be available for') }
				icon={ Calendar }
			/>
		</Steps>
	);
};

export default AddNewTicketSteps;
