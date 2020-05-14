import React, { CSSProperties, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { FormRenderProps } from 'react-final-form';

import AddNewTicketSteps from './AddNewTicketSteps';
import { usePrevNext } from '@appServices/hooks';
import { Button } from '@infraUI/inputs';
import { TicketAssignmentsManager } from '@edtrUI/ticketAssignmentsManager/components';
import { useDataState } from '@edtrUI/ticketAssignmentsManager/data';

// temporary
const buttonRowStyle: CSSProperties = { display: 'flex', justifyContent: 'center', marginTop: '2em' };

/**
 * This component is inside both RFF and TAM contexts, so we can use all of their features
 */
const ModalBody: React.FC<FormRenderProps> = ({
	children,
	hasSubmitErrors,
	hasValidationErrors,
	pristine,
	submitting,
	form: { mutators, submit },
}) => {
	const { current, prev, next } = usePrevNext();

	const { getData, hasOrphanEntities } = useDataState();

	const data = getData();

	useEffect(() => {
		// update value of `datetimes` field in RFF state
		mutators.updateFieldValue('datetimes', data?.tickets?.NEW_TICKET?.datetimes);
	}, [data?.tickets]);

	const isSaveDisabled = submitting || pristine || hasValidationErrors || hasSubmitErrors;
	const isSubmitDisabled = hasOrphanEntities();

	return (
		<div>
			<AddNewTicketSteps current={ current } />
			{/* RFF fields */ }
			{ current === 0 && children }
			{ current === 1 && <TicketAssignmentsManager /> }
			<div style={ buttonRowStyle }>
				{ current === 0 && (
					<Button buttonText={ __('Save and assign dates') } onClick={ next } isDisabled={ isSaveDisabled } />
				) }
				{ current === 1 && (
					<>
						<Button buttonText={ __('Previous') } onClick={ prev } />
						<Button buttonText={ __('Submit') } onClick={ submit } isDisabled={ isSubmitDisabled } />
					</>
				) }
			</div>
		</div>
	);
};

export default ModalBody;
