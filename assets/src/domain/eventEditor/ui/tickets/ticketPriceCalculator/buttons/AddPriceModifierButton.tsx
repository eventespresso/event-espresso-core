import React from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import { EspressoButton } from '@application/ui/input';
import { __ } from '@wordpress/i18n';

interface AddPriceModifierButtonProps {
	addPriceModifier: VoidFunction;
}

const AddPriceModifierButton: React.FC<AddPriceModifierButtonProps> = ({ addPriceModifier }) => (
	<EspressoButton
		icon={<PlusCircleFilled />}
		onClick={addPriceModifier}
		tooltip={__('add new price modifier after this row')}
	/>
);

export default AddPriceModifierButton;
