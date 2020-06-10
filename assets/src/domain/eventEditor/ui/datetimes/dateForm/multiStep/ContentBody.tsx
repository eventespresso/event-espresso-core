import React from 'react';
import { __ } from '@wordpress/i18n';
import { FormSpy } from 'react-final-form';

import { Button, ButtonRow, ButtonType } from '@application/ui/input';
import { Submit } from '@application/ui/input/Stepper/buttons';
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
									<Button
										buttonText={__('Save and assign tickets')}
										buttonType={ButtonType.PRIMARY}
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
									<Button
										buttonText={__('Previous')}
										buttonType={ButtonType.SECONDARY}
										onClick={prev}
										leftIcon='chevron-left'
									/>
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
