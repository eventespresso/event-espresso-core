import React from 'react';
import { __ } from '@wordpress/i18n';
import { useForm } from 'react-final-form';

import { Button } from './adapters';
import { FormButtonProps } from './types';

interface ResetButtonProps extends FormButtonProps {
	disabled?: boolean;
}

const ResetButton: React.FC<ResetButtonProps> = ({ disabled, label, ...props }) => {
	const form = useForm();
	return (
		<div className='reset-button'>
			<Button
				htmlType='reset'
				disabled={disabled}
				className='reset-button'
				onClick={() => form.reset()}
				{...props}
			>
				{label || __('Reset')}
			</Button>
		</div>
	);
};

export default ResetButton;
