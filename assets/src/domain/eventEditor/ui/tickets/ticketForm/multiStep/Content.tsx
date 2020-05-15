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

	const onSubmit = useCallback(
		({ prices, deletedPrices, ...fields }) => {
			mutatePrices(prices, deletedPrices).then((relatedPriceIds) => {
				const input = { ...fields, prices: relatedPriceIds };

				if (entity?.id) {
					updateEntity(input);
				} else {
					createEntity(input);
				}
			});
			onClose();
		},
		[createEntity, entity?.id, mutatePrices, updateEntity]
	);
	const formConfig = useTicketFormConfig(entity?.id, { onSubmit });

	return <EspressoForm {...formConfig} formWrapper={ContentWrapper} />;
};

export default Content;
