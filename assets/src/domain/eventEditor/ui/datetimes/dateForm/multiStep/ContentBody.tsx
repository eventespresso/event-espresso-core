import React from 'react';
import { __ } from '@wordpress/i18n';
import { FormSpy } from 'react-final-form';

import { ButtonRow } from '@application/ui/input';
import { Next, Previous, Submit } from '@application/ui/input/Stepper/buttons';
import { TicketAssignmentsManager } from '@edtrUI/ticketAssignmentsManager/components';
import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
import { usePrevNext } from '@appServices/hooks';

import DateFormSteps from './DateFormSteps';
import useDataListener from './useDataListener';

/**
 * This component is inside both RFF and TAM contexts, so we can use all of their features
 */
const ContentBody: React.FC = ({ children }) => {
	// init data listener to update RFF data
	useDataListener();

	const { current, prev, next } = usePrevNext();
	const { hasOrphanEntities } = useTAMDataState();

	const isSubmitDisabled = hasOrphanEntities();

	const subscription = { submitting: true, hasValidationErrors: true, hasSubmitErrors: true };

	return (
		<FormSpy subscription={subscription}>
			{({ form, hasSubmitErrors, hasValidationErrors, submitting }) => {
				const isSaveDisabled = submitting || hasValidationErrors || hasSubmitErrors;

				return (
					<div>
						<DateFormSteps current={current} />
						{/* RFF fields */}
						{current === 0 && (
							<>
								{children}
								<ButtonRow rightAligned>
									<Next
										buttonText={__('Save and assign tickets')}
										onClick={next}
										isDisabled={isSaveDisabled}
									/>
								</ButtonRow>
							</>
						)}

						{current === 1 && (
							<>
								<TicketAssignmentsManager />
								<ButtonRow rightAligned>
									<Previous onClick={prev} />
									<Submit onClick={form.submit} isDisabled={isSubmitDisabled} />
								</ButtonRow>
							</>
						)}
					</div>
				);
			}}
		</FormSpy>
	);
};

export default ContentBody;
