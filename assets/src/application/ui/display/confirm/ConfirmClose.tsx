import React from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmProps } from './types';
import useConfirm from './useConfirm';

const ConfirmClose: React.FC<ConfirmProps> = (props) => {
	const title = props.title || __('Are you sure you want to close this?');
	const confirm = useConfirm({ ...props, title });

	return confirm;
};

export default ConfirmClose;
