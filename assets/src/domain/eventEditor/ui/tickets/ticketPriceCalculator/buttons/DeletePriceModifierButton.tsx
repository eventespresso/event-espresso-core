import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@appDisplay/confirm';
import { Trash } from '@appDisplay/espressoIcons';
import { PriceModifierProps } from '../types';
import { useDataState } from '../data';

const DeletePriceModifierButton: React.FC<PriceModifierProps> = ({ price }) => {
	const { deletePrice } = useDataState();

	const buttonProps = { icon: Trash, tooltip: __('delete price modifier'), variant: 'outline' as 'outline' };
	const onConfirm = useCallback(() => deletePrice(price.id, price.isNew), [price.id, price.isNew]);

	return <ConfirmDelete buttonProps={buttonProps} onConfirm={onConfirm} />;
};

export default DeletePriceModifierButton;
