import React from 'react';
import { __ } from '@wordpress/i18n';

import { withContext as withTAMContext } from '@edtrUI/ticketAssignmentsManager/context';
import ContentBody from './ContentBody';
import { Datetime } from '@edtrServices/apollo';
import { ContentWrapperProps } from './types';

/**
 * This component is inside RFF context, so we can use all of RFF features.
 */
const ContentWrapper: React.FC<ContentWrapperProps> = (props) => {
	const { values } = props.form.getState();

	const datetime = {
		...values,
		id: values.id ?? 'NEW_DATE',
		dbId: values.dbId ?? 0,
	} as Datetime;

	return withTAMContext(
		ContentBody,
		{
			assignmentType: 'forDate',
			entity: datetime,
		},
		props
	);
};

export default ContentWrapper;
