import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button, ButtonProps, ButtonType } from '@application/ui/input';
import { SaveOutlined } from '@appDisplay/icons/svgs';

const Submit: React.FC<ButtonProps> = ({ isDisabled, onClick }) => (
	<Button
		buttonText={__('Submit')}
		buttonType={ButtonType.PRIMARY}
		onClick={onClick}
		isDisabled={isDisabled}
		leftIcon={SaveOutlined}
	/>
);

export default Submit;
