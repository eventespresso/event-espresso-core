import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { ConfirmDelete } from '@application/ui/input/confirm';
import { EspressoButton, Icon } from '@application/ui/input';
import { PriceModifierProps } from '../types';
import { useDataState } from '../data';

const DeletePriceModifierButton: React.FC<PriceModifierProps> = ({ price }) => {
	const { deletePrice } = useDataState();
	const onClick = useCallback(() => deletePrice(price.id, price.isNew), [price.id, price.isNew]);

	return (
		<ConfirmDelete
			children={<EspressoButton icon={Icon.TRASH} tooltip={__('delete price modifier')} />}
			onConfirm={onClick}
		/>
	);
};

export default DeletePriceModifierButton;
