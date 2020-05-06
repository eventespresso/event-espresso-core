import React from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import statusOptions from '@sharedEntities/registration/statusOptions';
import { SelectControlProps } from './types';
import { RegistrationStatus } from '@dataServices/apollo/queries/registrations/types';

interface RegStatusControlProps extends SelectControlProps {
	setStatus?: (order: RegistrationStatus) => void;
	status: RegistrationStatus;
}

const RegStatusControl: React.FC<RegStatusControlProps> = ({ status, setStatus, ...rest }) => {
	return (
		<SelectControl
			label={__('Select Registration Status', 'event_espresso')}
			value={status}
			options={statusOptions}
			onChange={setStatus}
			{...rest}
		/>
	);
};

export default RegStatusControl;
