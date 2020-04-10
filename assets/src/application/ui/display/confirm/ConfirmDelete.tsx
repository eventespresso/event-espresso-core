import React from 'react';
import { __ } from '@wordpress/i18n';

import { AlertDialog, AlertDialogProps } from '@infraUI/display';

const ConfirmDelete: React.FC<AlertDialogProps> = (props) => {
	const title = props.title || __('Are you sure you want to delete this?');
	return <AlertDialog {...props} title={title} />;
};

export default ConfirmDelete;
