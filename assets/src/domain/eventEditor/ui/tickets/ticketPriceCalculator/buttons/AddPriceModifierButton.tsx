import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { EspressoButton } from '@application/ui/input';

interface AddPriceModifierButtonProps {
	addPriceModifier: () => void;
}

const AddPriceModifierButton: React.FC<AddPriceModifierButtonProps> = ({ addPriceModifier }) => (
	<EspressoButton key='add' icon={<PlusCircleOutlined />} onClick={addPriceModifier} />
);

export default AddPriceModifierButton;
