import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from './adapters';
import { SubmitProps } from './types';
import ResetButton from './ResetButton';

const Submit: React.FC<SubmitProps> = ({ submitting, submitButton, resetButton }) => {
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

			{resetButton ? <ResetButton disabled={submitting} {...resetButton} /> : null}
		</div>
	);
};

export default Submit;
