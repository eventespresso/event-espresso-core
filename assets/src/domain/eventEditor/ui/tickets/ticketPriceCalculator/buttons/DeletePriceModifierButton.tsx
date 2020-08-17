import React, { useCallback, useMemo } from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@appDisplay/confirm';
import { Trash } from '@appDisplay/icons/svgs';
import { PriceModifierProps } from '../types';
import { useDataState } from '../data';

const DeletePriceModifierButton: React.FC<PriceModifierProps> = ({ price }) => {
	const { deletePrice } = useDataState();

	const buttonProps = useMemo(() => ({ icon: () => <Trash noMargin />, tooltip: __('delete price modifier') }), []);
	// new or default prices should not be deleted server-side
	const isNewOrDefault = price.isNew || price.isDefault;
	const onConfirm = useCallback(() => {
		// delete the price from TPC state
		deletePrice(price.id, isNewOrDefault);
	}, [price.id, isNewOrDefault]);

	return <ConfirmDelete buttonProps={buttonProps} onConfirm={onConfirm} />;
};

export default DeletePriceModifierButton;
