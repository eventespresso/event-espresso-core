import React from 'react';
import { __ } from '@wordpress/i18n';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';

const PriceNameInput: React.FC<PriceModifierProps> = ({ price }) => {
	return (
		<PriceField
			component={'input'}
			// default prices cannot be changed in TPC
			disabled={price.isDefault}
			field='name'
			placeholder={__('label...')}
			price={price}
			type={'text'}
		/>
	);
};
export default PriceNameInput;
