import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from './adapters';
import { SubmitProps } from './types';

const Submit: React.FC<SubmitProps> = ({ submitting, label, ...rest }) => {
	return (
		<div className='submit-wrap'>
			<Button
				icon='save'
				htmlType='submit'
				disabled={submitting}
				loading={submitting}
				className='submit-button'
				{...rest}
			>
				{label || __('Submit')}
			</Button>
		</div>
	);
};

export default Submit;
