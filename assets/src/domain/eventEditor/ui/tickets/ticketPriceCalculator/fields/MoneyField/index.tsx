import React from 'react';

import { MoneyFieldProps } from './types';
import useConfig from '@appServices/config/useConfig';
import './style.scss';

const MoneyField: React.FC<MoneyFieldProps> = ({ after, before, children, isPercent = false }) => {
	const { currency } = useConfig();

	return (
		<div className='ee-ticket-price-field'>
			<div className='ee-ticket-price-field__before'>{before}</div>
			{children}
			<div className='ee-ticket-price-field__after'>{after}</div>
		</div>
	);
};

export default React.memo(MoneyField);
