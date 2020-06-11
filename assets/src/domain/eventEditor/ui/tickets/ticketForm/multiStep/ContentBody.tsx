import React from 'react';
import { __ } from '@wordpress/i18n';
import { FormSpy } from 'react-final-form';
import { anyPass, isNil, isEmpty } from 'ramda';

import TicketFormSteps from './TicketFormSteps';
import { usePrevNext } from '@appServices/hooks';
import { ButtonRow, ButtonType } from '@application/ui/input';
import { Next, Previous, Submit } from '@application/ui/input/Stepper/buttons';
import { TicketAssignmentsManager } from '@edtrUI/ticketAssignmentsManager/components';
import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
import TicketPriceCalculator from '@edtrUI/tickets/ticketPriceCalculator/components/TicketPriceCalculator';
import useDataListener from './useDataListener';

/**
 * This component is inside both RFF and TAM contexts, so we can use all of their features
 */
const ContentBody: React.FC = ({ children }) => {
	// init data listener to update RFF data
	useDataListener();

	const { current, goto, prev, next } = usePrevNext();
	const { hasOrphanEntities, getData } = useTAMDataState();
	const isSubmitDisabled = hasOrphanEntities();

	const subscription = { submitting: true, hasValidationErrors: true, hasSubmitErrors: true };

	return (
		<FormSpy subscription={subscription}>
			{({ form, hasSubmitErrors, hasValidationErrors, submitting, values }) => {
				const isSaveDisabled = submitting || hasValidationErrors || hasSubmitErrors;

				const prices = values?.prices || [];
				const isTPCSubmitDisabled =
					prices.length && prices.some(({ amount }) => anyPass([isNil, isEmpty])(amount));

				return (
					<div>
						<TicketFormSteps current={current} />
						{/* RFF fields */}
						{current === 0 && (
							<>
								{children}
								<ButtonRow rightAligned>
									<Next
										buttonText={__('Add ticket prices')}
										buttonType={ButtonType.SECONDARY}
										isDisabled={isSaveDisabled}
										onClick={next}
									/>
									<Next
										buttonText={__('Skip prices - assign dates')}
										isDisabled={isSaveDisabled}
										onClick={() => goto(2)}
										skippable
									/>
								</ButtonRow>
							</>
						)}

						{current === 1 && (
							<>
								<TicketPriceCalculator context='editTicketForm' />
								<ButtonRow rightAligned>
									<Previous onClick={prev} />
									<Next
										buttonText={__('Save and assign dates')}
										onClick={next}
										isDisabled={isTPCSubmitDisabled}
									/>
								</ButtonRow>
							</>
						)}

						{current === 2 && (
							<>
								<TicketAssignmentsManager />
								<ButtonRow rightAligned>
									<Previous buttonText={__('Ticket details')} onClick={() => goto(0)} skippable />
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
