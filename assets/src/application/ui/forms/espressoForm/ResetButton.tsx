import React from 'react';
import { __ } from '@wordpress/i18n';
import { useForm } from 'react-final-form';

import { EspressoButton, EspressoButtonProps } from '../../input';

const ResetButton: React.FC<EspressoButtonProps> = ({ disabled, label, ...props }) => {
	const form = useForm();
	return (
		<div className='reset-button'>
			<EspressoButton
				htmlType='reset'
				disabled={disabled}
				htmlClass='reset-button'
				onClick={() => form.reset()}
				buttonText={label || __('Reset')}
				{...props}
			/>
		</div>
	);
};

export default ResetButton;
