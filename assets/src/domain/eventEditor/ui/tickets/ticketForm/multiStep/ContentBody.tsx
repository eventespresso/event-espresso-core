import React from 'react';
import { __ } from '@wordpress/i18n';
import { FormSpy } from 'react-final-form';
import { anyPass, isNil, isEmpty } from 'ramda';

import TicketFormSteps from './TicketFormSteps';
import { usePrevNext } from '@appServices/hooks';
import { Button, ButtonRow } from '@application/ui/input';
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
									<Button
										buttonText={__('Add ticket prices')}
										onClick={next}
										isDisabled={isSaveDisabled}
										rightIcon='chevron-right'
									/>
									<Button
										buttonText={__('Skip prices - assign dates')}
										onClick={() => goto(2)}
										isDisabled={isSaveDisabled}
										rightIcon='chevron-right'
									/>
								</ButtonRow>
							</>
						)}

						{current === 1 && (
							<>
								<TicketPriceCalculator />
								<ButtonRow rightAligned>
									<Button buttonText={__('Previous')} onClick={prev} leftIcon='chevron-left' />
									<Button
										buttonText={__('Save and assign dates')}
										onClick={next}
										isDisabled={isTPCSubmitDisabled}
										rightIcon='chevron-right'
									/>
								</ButtonRow>
							</>
						)}

						{current === 2 && (
							<>
								<TicketAssignmentsManager />
								<ButtonRow rightAligned>
									<Button
										buttonText={__('Ticket details')}
										onClick={() => goto(0)}
										leftIcon='chevron-left'
									/>
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
