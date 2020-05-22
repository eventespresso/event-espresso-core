import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@appDisplay/confirm';
import { useDataState } from '../data';
import { ButtonType } from '@application/ui/input';

const DeleteAllPricesButton: React.FC = () => {
	const { prices, deletePrice, updateTicketPrice } = useDataState();

	const buttonProps = {
		buttonText: __('Delete all prices'),
		buttonType: ButtonType.ACCENT,
	};
	const onConfirm = useCallback(() => {
		prices.forEach(({ id, isNew, isDefault }) => {
			deletePrice(id, isNew || isDefault);
		});
		// Set ticket price to 0
		updateTicketPrice(0);
	}, [prices, deletePrice]);

	const title = __('Are you sure you want to delete all the prices? That will make the ticket free.');

	return <ConfirmDelete buttonProps={buttonProps} onConfirm={onConfirm} title={title} />;
};

export default DeleteAllPricesButton;
