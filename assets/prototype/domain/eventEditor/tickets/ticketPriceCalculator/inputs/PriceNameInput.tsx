import React from 'react';
import { Field } from 'react-final-form';
import { __ } from '@wordpress/i18n';

// just temporary
import styles from '../inlineStyles';
import { PriceInputProps } from '../types';

const PriceNameInput: React.FC<PriceInputProps> = ({ name, price }): JSX.Element => {
	return (
		<Field
			type={'text'}
			component={'input'}
			initialValue={price.name}
			name={`${name}.name`}
			placeholder={__('label...', 'event_espresso')}
			style={styles.input}
		/>
	);
};
export default PriceNameInput;
