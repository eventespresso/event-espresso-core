import React, { memo } from 'react';
import { __ } from '@wordpress/i18n';

import { Button, ButtonProps, ButtonType } from '@application/ui/input';
import { SaveOutlined } from '@appDisplay/icons/svgs';

const Submit: React.FC<ButtonProps> = ({ isDisabled, onClick, ...props }) => {
	const buttonText = props.buttonText || __('Submit');

	return (
		<Button
			buttonText={buttonText}
			buttonType={ButtonType.PRIMARY}
			onClick={onClick}
			isDisabled={isDisabled}
			icon={SaveOutlined}
		/>
	);
};

export default memo(Submit);
