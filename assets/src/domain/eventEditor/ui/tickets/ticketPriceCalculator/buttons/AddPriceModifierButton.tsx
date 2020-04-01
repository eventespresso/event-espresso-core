import React from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import { EspressoButton } from '@application/ui/input';

interface AddPriceModifierButtonProps {
	addPriceModifier: VoidFunction;
}

const AddPriceModifierButton: React.FC<AddPriceModifierButtonProps> = ({ addPriceModifier }) => (
	<EspressoButton icon={<PlusCircleFilled />} onClick={addPriceModifier} />
);

export default AddPriceModifierButton;
