import React from 'react';
import { Field } from 'react-final-form';
import { __ } from '@wordpress/i18n';

// just temporary
import styles from '../inlineStyles';
import { PriceInputProps } from '../types';

const PriceDescriptionInput: React.FC<PriceInputProps> = ({ name, price }) => {
	return (
		<Field
			type={'text'}
			component={'input'}
			initialValue={price.desc}
			name={`${name}.desc`}
			placeholder={__('description...')}
			style={styles.input}
		/>
	);
};

export default PriceDescriptionInput;
