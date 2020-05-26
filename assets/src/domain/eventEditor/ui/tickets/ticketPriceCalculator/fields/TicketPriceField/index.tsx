import React from 'react';

import './style.scss';

interface TicketPriceFieldProps {
	after: string;
	before: string;
	field: React.ReactNode;
}

const TicketPriceField: React.FC<TicketPriceFieldProps> = ({ after, before, field }) => {
	return (
		<div className='ee-ticket-price-field'>
			<div className='ee-ticket-price-field__before'>{before}</div>
			{field}
			<div className='ee-ticket-price-field__after'>{after}</div>
		</div>
	);
};

export default React.memo(TicketPriceField);
