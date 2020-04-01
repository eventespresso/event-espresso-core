import React, { useCallback } from 'react';

import { EspressoButton, Icon } from '@application/ui/input';
import { PriceModifierProps } from '../types';
import { useDataState } from '../data';

const DeletePriceModifierButton: React.FC<PriceModifierProps> = ({ price }) => {
	const { deletePrice } = useDataState();
	const onClick = useCallback(() => deletePrice(price.id, price.isNew), [price.id, price.isNew]);

	return <EspressoButton icon={Icon.TRASH} onClick={onClick} />;
};

export default DeletePriceModifierButton;
