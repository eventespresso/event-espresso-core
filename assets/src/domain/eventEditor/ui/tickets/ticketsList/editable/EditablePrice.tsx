import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import type { TicketItemProps } from '../types';
import { getPropsAreEqual } from '@appServices/utilities';
import CurrencyInput from '@appInputs/CurrencyInput';
import useRecalculateBasePrice from '../../hooks/useRecalculateBasePrice';
import { useMemoStringify } from '@application/services/hooks';

interface EditablePriceProps extends TicketItemProps {
	className?: string;
}

const EditablePrice: React.FC<EditablePriceProps> = ({ entity: ticket, className }) => {
	const recalculateBasePrice = useRecalculateBasePrice(ticket.id);
	const onChangePrice = useCallback(
		({ amount }: any): void => {
			const price = parseFloat(amount);
			if (price !== ticket.price) {
				recalculateBasePrice(price);
			}
		},
		[ticket.cacheId]
	);

	const wrapperProps = useMemoStringify({ className });

	return (
		<CurrencyInput
			id={ticket.id}
			amount={ticket.price}
			placeholder={__('set price...')}
			wrapperProps={wrapperProps}
			onChange={onChangePrice}
			tag={'h3'}
			tooltip={__('edit ticket total...')}
		/>
	);
};

export default React.memo(EditablePrice, getPropsAreEqual(['entity', 'price']));
