import React from 'react';
import { __ } from '@wordpress/i18n';

import { Steps, Step } from '@infraUI/display/steps';
import { PrevNext } from '@application/services/hooks/usePrevNext';
// import { ProfileOutlined } from '@appDisplay/icons/svgs';
import { Calendar, Ticket } from '@appDisplay/icons';

const AddNewDateSteps: React.FC<Pick<PrevNext, 'current'>> = ({ current }) => {
	return (
		<Steps current={ current } showStepNumber>
			<Step
				title={ __('Date Details') }
				description={ __('primary information about the date') }
				icon={ Calendar }
			/>
			<Step
				title={ __('Assign Tickets') }
				description={ __('which tickets will be available for this date') }
				icon={ Ticket }
			/>
		</Steps>
	);
};

export default AddNewDateSteps;
