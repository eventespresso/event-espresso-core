import React from 'react';
import { __ } from '@wordpress/i18n';
import { FormRenderProps } from 'react-final-form';

import { withContext as withTAMContext } from '@edtrUI/ticketAssignmentsManager/context';
import ModalBody from './ModalBody';
import { Ticket } from '@edtrServices/apollo';

/**
 * This component is inside RFF context, so we can use all of RFF features.
 */
const ContentWrapper: React.FC<FormRenderProps> = (props) => {
	const { values } = props.form.getState();

	const entity = { ...values, id: 'NEW_TICKET', dbId: 0 } as Ticket;

	return withTAMContext(
		ModalBody,
		{
			assignmentType: 'forTicket',
			entity,
		},
		props
	);
};

export default ContentWrapper;
