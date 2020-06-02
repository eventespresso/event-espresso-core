import React from 'react';
import { __ } from '@wordpress/i18n';
import { FormSpy } from 'react-final-form';

import DateFormSteps from './DateFormSteps';
import { usePrevNext } from '@appServices/hooks';
import { Button, ButtonRow } from '@application/ui/input';
import { TicketAssignmentsManager } from '@edtrUI/ticketAssignmentsManager/components';
import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
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
									<Button
										buttonText={__('Save and assign tickets')}
										onClick={next}
										isDisabled={isSaveDisabled}
										rightIcon='chevron-right'
									/>
								</ButtonRow>
							</>
						)}

						{current === 1 && (
							<>
								<TicketAssignmentsManager />
								<ButtonRow rightAligned>
									<Button buttonText={__('Previous')} onClick={prev} leftIcon='chevron-left' />
									<Button
										buttonText={__('Submit')}
										onClick={form.submit}
										isDisabled={isSubmitDisabled}
									/>
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
