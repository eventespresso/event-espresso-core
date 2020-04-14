import React from 'react';
import { __ } from '@wordpress/i18n';
import { useForm } from 'react-final-form';

import { EspressoButton, EspressoButtonProps } from '../../input';

const ResetButton: React.FC<EspressoButtonProps> = ({ isDisabled, buttonText, ...props }) => {
	const form = useForm();
	return (
		<div className='reset-button'>
			<EspressoButton
				type='reset'
				isDisabled={isDisabled}
				className='reset-button'
				onClick={() => form.reset()}
				buttonText={buttonText || __('Reset')}
				{...props}
			/>
		</div>
	);
};

export default ResetButton;
