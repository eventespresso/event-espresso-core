import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonProps } from '../../input';
import ResetButton from './ResetButton';

export interface SubmitProps extends Omit<EspressoButtonProps, 'onClick' | 'loading'> {
	submitting: boolean;
}

const Submit: React.FC<SubmitProps> = ({ submitting, submitButton, resetButton }) => {
	return (
		<div className='submit-wrapper'>
			<div className='submit-button'>
				<EspressoButton
					icon='save'
					htmlType='submit'
					disabled={submitting}
					loading={submitting}
					className='submit-button'
					type='primary'
					buttonText={submitButton.label || __('Submit')}
					{...submitButton}
				/>
			</div>

			{resetButton ? <ResetButton disabled={submitting} {...resetButton} /> : null}
		</div>
	);
};

export default Submit;
