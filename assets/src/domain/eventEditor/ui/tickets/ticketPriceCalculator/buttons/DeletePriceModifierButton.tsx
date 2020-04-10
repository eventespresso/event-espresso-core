import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@appDisplay/confirm';
import { Icon } from '@application/ui/input';
import { PriceModifierProps } from '../types';
import { useDataState } from '../data';

const DeletePriceModifierButton: React.FC<PriceModifierProps> = ({ price }) => {
	const { deletePrice } = useDataState();

	const buttonProps = { icon: Icon.TRASH, tooltip: __('delete price modifier') };
	const onConfirm = useCallback(() => deletePrice(price.id, price.isNew), [price.id, price.isNew]);

	return <ConfirmDelete buttonProps={buttonProps} onConfirm={onConfirm} />;
};

export default DeletePriceModifierButton;
