import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

import { EspressoButton } from '@application/ui/input';
import { PriceModifierProps } from '../types';
import { useDataState } from '../data';

const DeletePriceModifierButton: React.FC<PriceModifierProps> = ({ price }) => {
	const { deletePrice } = useDataState();

	const onClick = () => deletePrice(price.id, price.isNew);

	return <EspressoButton icon={<DeleteOutlined />} onClick={onClick} />;
};

export default DeletePriceModifierButton;
