import React from 'react';
import { EspressoButton } from '@application/ui/input';

type DeletePriceModifierButtonProps = {
	index: number;
	remove: (index: number) => void;
};

const DeletePriceModifierButton: React.FC<DeletePriceModifierButtonProps> = ({ index, remove }) => {
	return <EspressoButton key='delete' icon='delete' onClick={(): void => remove(index)} />;
};

export default DeletePriceModifierButton;
