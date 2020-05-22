import React from 'react';
import { __ } from '@wordpress/i18n';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';

const PriceDescriptionInput: React.FC<PriceModifierProps> = ({ price }) => {
	return (
		<PriceField
			component={'input'}
			// default prices cannot be changed in TPC
			disabled={price.isDefault}
			field='description'
			placeholder={__('description...')}
			price={price}
			type={'text'}
		/>
	);
};

export default PriceDescriptionInput;
