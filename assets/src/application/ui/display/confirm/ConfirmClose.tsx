import React from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmPropsWithButton } from './types';
import useConfirmWithButton from './useConfirmWithButton';

const ConfirmClose: React.FC<ConfirmPropsWithButton> = (props) => {
	const title = props.title || __('Are you sure you want to close this?');
	const confirm = useConfirmWithButton({ ...props, title });

	return confirm;
};

export default ConfirmClose;
