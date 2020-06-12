import React from 'react';
import { __ } from '@wordpress/i18n';

import { withContext as withTAMContext } from '@edtrUI/ticketAssignmentsManager/context';
import ContentBody from './ContentBody';
import { ContentWrapperProps } from './types';
import { withEntityFormDetails } from '@sharedUI/entityEditModal';

/**
 * This component is inside RFF context, so we can use all of RFF features.
 */
const ContentWrapper: React.FC<ContentWrapperProps> = (props) => {
	// provide entity details to TAM from edit form
	return withEntityFormDetails(
		({ entity }) =>
			withTAMContext(
				ContentBody,
				{
					assignmentType: 'forDate',
					entity,
				},
				props
			),
		'NEW_DATE'
	);
};

export default ContentWrapper;
