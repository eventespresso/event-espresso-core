import React from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonProps } from '../../input';
import ResetButton from './ResetButton';
import { FormButtonProps } from './types';
import { Save } from '@appDisplay/espressoIcons';

export interface SubmitProps extends Omit<EspressoButtonProps, 'onClick' | 'loading'> {
	submitting: boolean;
	hasErrors?: boolean;
	resetButton: FormButtonProps;
	submitButton: FormButtonProps;
}

const Submit: React.FC<SubmitProps> = ({ submitting, hasErrors, submitButton, resetButton }) => {
	return (
		<div className='submit-wrapper'>
			<div className='submit-button'>
				<EspressoButton
					icon={Save}
					type='submit'
					isDisabled={hasErrors || submitting}
					isLoading={submitting}
					className='submit-button'
					buttonText={submitButton.buttonText || __('Submit')}
					{...submitButton}
				/>
			</div>

			{resetButton ? <ResetButton isDisabled={submitting} {...resetButton} /> : null}
		</div>
	);
};

export default Submit;
