import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';
import { FormRenderProps } from 'react-final-form';

import DateFormSteps from './DateFormSteps';
import { usePrevNext } from '@appServices/hooks';
import { Button } from '@infraUI/inputs';
import { TicketAssignmentsManager } from '@edtrUI/ticketAssignmentsManager/components';
import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
import useDataListener from './useDataListener';

// temporary
const buttonRowStyle: CSSProperties = { display: 'flex', justifyContent: 'center', marginTop: '2em' };

/**
 * This component is inside both RFF and TAM contexts, so we can use all of their features
 */
const ContentBody: React.FC<FormRenderProps> = ({
	children,
	hasSubmitErrors,
	hasValidationErrors,
	submitting,
	form,
}) => {
	// init data listener to update RFF data
	useDataListener(form);
	const { current, prev, next } = usePrevNext();
	const { hasOrphanEntities } = useTAMDataState();

	const isSaveDisabled = submitting || hasValidationErrors || hasSubmitErrors;
	const isSubmitDisabled = hasOrphanEntities();

	return (
		<div>
			<DateFormSteps current={current} />
			{/* RFF fields */}
			{current === 0 && children}

			{current === 1 && <TicketAssignmentsManager />}
			<div style={buttonRowStyle}>
				{current === 0 && (
					<Button buttonText={__('Save and assign tickets')} onClick={next} isDisabled={isSaveDisabled} />
				)}
				{current === 1 && (
					<>
						<Button buttonText={__('Previous')} onClick={prev} />
						<Button buttonText={__('Submit')} onClick={form.submit} isDisabled={isSubmitDisabled} />
					</>
				)}
			</div>
		</div>
	);
};

export default ContentBody;
