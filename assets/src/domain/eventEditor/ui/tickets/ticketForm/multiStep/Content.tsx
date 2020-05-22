import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoForm } from '@application/ui/forms/espressoForm';
import useTicketFormConfig from '../useTicketFormConfig';
import ContentWrapper from './ContentWrapper';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { ContentProps } from './types';
import { useMutatePrices } from '@edtrUI/tickets/ticketPriceCalculator/hooks';

const Content: React.FC<ContentProps> = ({ entity, onClose }) => {
	const { createEntity, updateEntity } = useTicketMutator();
	const mutatePrices = useMutatePrices();

	const mutateTicket = useCallback(
		(input) => {
			return entity?.id ? updateEntity(input) : createEntity(input);
		},
		[createEntity, entity?.id, updateEntity]
	);

	const onSubmit = useCallback(
		({ prices, deletedPrices, ...fields }) => {
			mutatePrices(prices, deletedPrices).then((relatedPriceIds) => {
				const input = { ...fields, prices: relatedPriceIds };
				mutateTicket(input);
			});
			onClose();
		},
		[entity?.id, mutatePrices, mutateTicket]
	);
	const formConfig = useTicketFormConfig(entity?.id, { onSubmit });

	return <EspressoForm {...formConfig} formWrapper={ContentWrapper} />;
};

export default Content;
