import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { EspressoForm } from '@application/ui/forms/espressoForm';
import useDatetimeFormConfig from '../useDateFormConfig';
import ContentWrapper from './ContentWrapper';
import {
	useDatetimeMutator,
	useTicketQuantityForCapacity,
	useUpdateRelatedTickets,
} from '@edtrServices/apollo/mutations';
import { ContentProps } from './types';

const Content: React.FC<ContentProps> = ({ entity, onClose }) => {
	const { createEntity, updateEntity } = useDatetimeMutator();

	const updateRelatedTickets = useUpdateRelatedTickets(entity?.id);
	const ticketQuantityForCapacity = useTicketQuantityForCapacity();

	const onSubmit = useCallback(
		(fields) => {
			// If it's an existing entity
			if (entity?.id) {
				// Update it
				updateEntity(fields);

				// whether date capacity has been changed
				const capacityChanged = fields?.capacity !== entity?.capacity;
				// if true, we need to update the quantity of all the related tickets
				if (capacityChanged) {
					const inputGenerator = ticketQuantityForCapacity(fields?.capacity);
					updateRelatedTickets(inputGenerator);
				}
			} else {
				// otherwise create it
				createEntity(fields);
			}
			onClose();
		},
		[createEntity, entity?.id, updateEntity]
	);
	const formConfig = useDatetimeFormConfig(entity?.id, { onSubmit });

	return <EspressoForm {...formConfig} formWrapper={ContentWrapper} />;
};

export default Content;
