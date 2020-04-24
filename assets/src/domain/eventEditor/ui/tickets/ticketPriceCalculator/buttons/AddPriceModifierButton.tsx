import React from 'react';
import { __ } from '@wordpress/i18n';

import { IconButton } from '@application/ui/input';
import { PlusCircleFilled } from '@appDisplay/icons/svgs';

interface AddPriceModifierButtonProps {
	addPriceModifier: VoidFunction;
}

const AddPriceModifierButton: React.FC<AddPriceModifierButtonProps> = ({ addPriceModifier }) => (
	<IconButton
		icon={PlusCircleFilled}
		onClick={addPriceModifier}
		tooltip={__('add new price modifier after this row')}
		variant='outline'
	/>
);

export default AddPriceModifierButton;
