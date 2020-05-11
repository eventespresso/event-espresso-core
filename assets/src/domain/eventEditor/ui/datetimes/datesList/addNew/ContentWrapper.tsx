import React from 'react';
import { __ } from '@wordpress/i18n';
import { FormRenderProps } from 'react-final-form';

import { withContext as withTAMContext } from '@edtrUI/ticketAssignmentsManager/context';
import ModalBody from './ModalBody';
import { Datetime } from '@edtrServices/apollo';

/**
 * This component is inside RFF context, so we can use all of RFF features.
 */
const ContentWrapper: React.FC<FormRenderProps> = (props) => {
	const { values } = props.form.getState();

	const entity = { ...values, id: 'NEW_DATE', dbId: 0 } as Datetime;

	return withTAMContext(
		ModalBody,
		{
			assignmentType: 'forDate',
			entity,
		},
		props
	);
};

export default ContentWrapper;
