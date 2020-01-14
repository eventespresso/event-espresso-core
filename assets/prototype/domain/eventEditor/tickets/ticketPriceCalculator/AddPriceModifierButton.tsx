import React from 'react';
import { Button } from '@blueprintjs/core';

interface AddPriceModifierButtonProps {
	addPriceModifier: () => void;
}

const AddPriceModifierButton: React.FunctionComponent<AddPriceModifierButtonProps> = ({
	addPriceModifier,
}): JSX.Element => <Button key={'add'} icon={'add'} onClick={addPriceModifier} minimal />;

export default AddPriceModifierButton;
