import React from 'react';
import { __ } from '@wordpress/i18n';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';

const PriceDescriptionInput: React.FC<PriceModifierProps> = ({ price }) => {
	return (
		<PriceField field='description' price={price} type={'text'} component={'input'} placeholder={__('description...')} />
	);
};

export default PriceDescriptionInput;
