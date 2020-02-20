import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { EspressoButton } from '@application/ui/input';

type DeletePriceModifierButtonProps = {
	index: number;
	remove: (index: number) => void;
};

const DeletePriceModifierButton: React.FC<DeletePriceModifierButtonProps> = ({ index, remove }) => {
	return <EspressoButton key='delete' icon={<DeleteOutlined />} onClick={(): void => remove(index)} />;
};

export default DeletePriceModifierButton;
