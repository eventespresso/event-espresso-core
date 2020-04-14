import React from 'react';
import { __ } from '@wordpress/i18n';
import { useForm } from 'react-final-form';

import { Button, ButtonProps } from '../../input';

const ResetButton: React.FC<ButtonProps> = ({ isDisabled, buttonText, ...props }) => {
	const form = useForm();
	return (
		<div className='reset-button'>
			<Button
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
