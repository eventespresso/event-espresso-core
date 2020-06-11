import React, { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@appDisplay/confirm';
import { Trash } from '@appDisplay/icons/svgs';
import { PriceModifierProps } from '../types';
import { useDataState } from '../data';
import { useRemoveDefaultTax } from '../hooks';

const DeletePriceModifierButton: React.FC<PriceModifierProps> = ({ price }) => {
	const { deletePrice, ticket } = useDataState();
	const removeDefaultTax = useRemoveDefaultTax(ticket?.id);

	const buttonProps = useMemo(() => ({ icon: () => <Trash noMargin />, tooltip: __('delete price modifier') }), []);
	// new or default prices should not be deleted server-side
	const isNewOrDefault = price.isNew || price.isDefault;
	const onConfirm = useCallback(() => {
		// delete the price from TPC state
		deletePrice(price.id, isNewOrDefault);
		// Remove default tax from relations
		removeDefaultTax(price);
	}, [price.id, isNewOrDefault, removeDefaultTax]);

	return <ConfirmDelete buttonProps={buttonProps} onConfirm={onConfirm} />;
};

export default DeletePriceModifierButton;
