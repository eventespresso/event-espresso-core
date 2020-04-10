import React from 'react';
import { __ } from '@wordpress/i18n';

import { AlertDialog, AlertDialogProps } from '@infraUI/display';
import ConfirmDelete from './ConfirmDelete';

interface ConfirmProps extends AlertDialogProps {
	type: 'delete';
}

const Confirm: React.FC<ConfirmProps> = ({ type, ...props }) => {
	if (type === 'delete') {
		return <ConfirmDelete {...props} />;
	}

	return <AlertDialog {...props} />;
};

export default Confirm;
