import React from 'react';
import { Field } from 'react-final-form';

// just temporary
import styles from './inlineStyles';
import { PriceInputProps } from './types';

const PriceNameInput = ({ name, price }: PriceInputProps): React.ReactNode => {
	return (
		<Field
			type={'text'}
			component={'input'}
			initialValue={price.name}
			name={`${name}.name`}
			placeholder={'label...'}
			style={styles.input}
		/>
	);
};
export default PriceNameInput;
