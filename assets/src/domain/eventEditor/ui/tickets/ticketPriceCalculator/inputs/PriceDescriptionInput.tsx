import React from 'react';
import { __ } from '@wordpress/i18n';

import { PriceModifierProps } from '../types';
import { PriceField } from '../fields';

// just temporary
import styles from '../inlineStyles';

const PriceDescriptionInput: React.FC<PriceModifierProps> = ({ price }) => {
	return (
		<PriceField
			field='desc'
			price={price}
			type={'text'}
			component={'input'}
			placeholder={__('description...')}
			style={styles.input}
		/>
	);
};

export default PriceDescriptionInput;
