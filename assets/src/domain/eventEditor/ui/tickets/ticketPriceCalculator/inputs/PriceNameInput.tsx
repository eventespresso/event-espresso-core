import React from 'react';
import { __ } from '@wordpress/i18n';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';

// just temporary
import styles from '../inlineStyles';

const PriceNameInput: React.FC<PriceModifierProps> = ({ price }) => {
	return (
		<PriceField
			field='name'
			price={price}
			type={'text'}
			component={'input'}
			placeholder={__('label...')}
			style={styles.input}
		/>
	);
};
export default PriceNameInput;
