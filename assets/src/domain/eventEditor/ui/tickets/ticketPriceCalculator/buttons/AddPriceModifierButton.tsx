import React from 'react';

import { EspressoButton } from '@application/ui/input';

interface AddPriceModifierButtonProps {
	addPriceModifier: () => void;
}

const AddPriceModifierButton: React.FC<AddPriceModifierButtonProps> = ({ addPriceModifier }) => (
	<EspressoButton key='add' icon='plus-circle' onClick={addPriceModifier} />
);

export default AddPriceModifierButton;
