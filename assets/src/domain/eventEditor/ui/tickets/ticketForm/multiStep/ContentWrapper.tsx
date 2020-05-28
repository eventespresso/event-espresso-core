import React from 'react';
import { __ } from '@wordpress/i18n';

import { withContext as withTAMContext } from '@edtrUI/ticketAssignmentsManager/context';
import { withContext as withTPCContext } from '@edtrUI/tickets/ticketPriceCalculator/context';
import ContentBody from './ContentBody';
import { Ticket } from '@edtrServices/apollo';
import { ContentWrapperProps } from './types';
import { useMemoStringify } from '@application/services/hooks';

const WithTPC: React.FC<ContentWrapperProps> = (props) => {
	const { values } = props.form.getState();
	return withTPCContext(
		ContentBody,
		{
			ticketId: values.id,
		},
		props
	);
};
/**
 * This component is inside RFF context, so we can use all of RFF features.
 */
const ContentWrapper: React.FC<ContentWrapperProps> = (props) => {
	const { values } = props.form.getState();

	const ticket = useMemoStringify({
		...values,
		id: values.id ?? 'NEW_TICKET',
		dbId: values.dbId ?? 0,
	}) as Ticket;

	return withTAMContext(
		WithTPC,
		{
			assignmentType: 'forTicket',
			entity: ticket,
		},
		props
	);
};

export default ContentWrapper;
