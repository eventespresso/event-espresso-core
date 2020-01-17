import React from 'react';
import { Field } from 'react-final-form';

// just temporary
import styles from './inlineStyles';
import { PriceInputProps } from './types';

const PriceDescriptionInput: React.FC<PriceInputProps> = ({ name, price }): JSX.Element => {
	return (
		<Field
			type={'text'}
			component={'input'}
			initialValue={price.desc}
			name={`${name}.desc`}
			placeholder={'description...'}
			style={styles.input}
		/>
	);
};

export default PriceDescriptionInput;
