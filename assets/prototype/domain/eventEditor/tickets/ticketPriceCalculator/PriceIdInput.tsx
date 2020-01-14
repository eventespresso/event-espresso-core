import React from 'react';
import { Field } from 'react-final-form';

import { PriceInputProps } from './types';

const PriceIdInput: React.FunctionComponent<PriceInputProps> = ({ name, price }): JSX.Element => {
	return (
		<>
			<Field type={'hidden'} component={'input'} initialValue={price.id} name={`${name}.id`} />
			<Field type={'hidden'} component={'input'} initialValue={price.isDiscount} name={`${name}.isDiscount`} />
			<Field type={'hidden'} component={'input'} initialValue={price.isPercent} name={`${name}.isPercent`} />
			<Field type={'text'} component={'input'} initialValue={price.dbId} name={`${name}.dbId`} disabled />
		</>
	);
};

export default PriceIdInput;
