import React from 'react';
import { __ } from '@wordpress/i18n';
import { useForm } from 'react-final-form';

import { Button } from './adapters';
import { SubmitProps } from './types';

const Submit: React.FC<SubmitProps> = ({ submitting, submitButton, resetButton }) => {
	const form = useForm();
	return (
		<div className='submit-wrapper'>
			<div className='submit-button'>
				<Button
					icon='save'
					htmlType='submit'
					disabled={submitting}
					loading={submitting}
					className='submit-button'
					type='primary'
					{...submitButton}
				>
					{submitButton.label || __('Submit')}
				</Button>
			</div>

			{resetButton ? (
				<div className='reset-button'>
					<Button
						htmlType='reset'
						disabled={submitting}
						className='reset-button'
						onClick={() => form.reset()}
						{...resetButton}
					>
						{resetButton.label || __('Reset')}
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default Submit;
