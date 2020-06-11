import React from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@appDisplay/confirm';
import { useRemoveAllTaxes } from '../../hooks';

const RemoveTaxesButton: React.FC = () => {
	const buttonProps = {
		buttonText: __('Remove taxes'),
	};

	const message = __("Are you sure you want to remove all of this ticket's taxes?");

	const removeAllTaxes = useRemoveAllTaxes();

	const title = __('Remove all taxes?');

	return <ConfirmDelete buttonProps={buttonProps} onConfirm={removeAllTaxes} message={message} title={title} />;
};

export default RemoveTaxesButton;
