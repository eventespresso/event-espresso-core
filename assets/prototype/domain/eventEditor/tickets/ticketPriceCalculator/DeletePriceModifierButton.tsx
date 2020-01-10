import React from 'react';
import { Button } from '@blueprintjs/core';

type DeletePriceModifierButtonProps = {
	index: number;
	remove: (index: number) => void;
};

const DeletePriceModifierButton: React.FunctionComponent<DeletePriceModifierButtonProps> = ({ index, remove }) => {
	return <Button key={'trash'} icon={'trash'} onClick={() => remove(index)} minimal />;
};

export default DeletePriceModifierButton;
