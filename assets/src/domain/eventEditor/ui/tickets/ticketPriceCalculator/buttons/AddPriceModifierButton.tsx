import React from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoIconButton } from '@application/ui/input';

interface AddPriceModifierButtonProps {
	addPriceModifier: VoidFunction;
}

const AddPriceModifierButton: React.FC<AddPriceModifierButtonProps> = ({ addPriceModifier }) => (
	<EspressoIconButton
		icon={PlusCircleFilled}
		onClick={addPriceModifier}
		tooltip={__('add new price modifier after this row')}
		variant='outline'
	/>
);

export default AddPriceModifierButton;
