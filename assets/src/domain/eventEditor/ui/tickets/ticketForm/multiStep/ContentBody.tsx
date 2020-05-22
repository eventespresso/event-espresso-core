import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';
import { FormSpy } from 'react-final-form';
import { anyPass, isNil, isEmpty } from 'ramda';

import TicketFormSteps from './TicketFormSteps';
import { usePrevNext } from '@appServices/hooks';
import { Button } from '@infraUI/inputs';
import { TicketAssignmentsManager } from '@edtrUI/ticketAssignmentsManager/components';
import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
import TicketPriceCalculator from '@edtrUI/tickets/ticketPriceCalculator/components/TicketPriceCalculator';
import useDataListener from './useDataListener';

// temporary
const buttonRowStyle: CSSProperties = { display: 'flex', justifyContent: 'flex-end', padding: '1rem 2rem' };

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
						{current === 0 && children}

						{current === 1 && <TicketPriceCalculator />}
						{current === 2 && <TicketAssignmentsManager />}
						<div style={buttonRowStyle}>
							{current === 0 && (
								<>
									<Button
										buttonText={__('Add ticket prices')}
										onClick={next}
										isDisabled={isSaveDisabled}
										rightIcon='chevron-right'
									/>
									<Button
										buttonText={__('Free ticket - assign dates')}
										onClick={() => goto(2)}
										isDisabled={isSaveDisabled}
										rightIcon='chevron-right'
									/>
								</>
							)}
							{current === 1 && (
								<>
									<Button buttonText={__('Previous')} onClick={prev} leftIcon='chevron-left' />
									<Button
										buttonText={__('Save and assign dates')}
										onClick={next}
										isDisabled={isTPCSubmitDisabled}
										rightIcon='chevron-right'
									/>
								</>
							)}
							{current === 2 && (
								<>
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
								</>
							)}
						</div>
					</div>
				);
			}}
		</FormSpy>
	);
};

export default ContentBody;
