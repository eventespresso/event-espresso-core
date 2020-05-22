import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';
import { FormSpy } from 'react-final-form';

import DateFormSteps from './DateFormSteps';
import { usePrevNext } from '@appServices/hooks';
import { Button } from '@infraUI/inputs';
import { TicketAssignmentsManager } from '@edtrUI/ticketAssignmentsManager/components';
import { useDataState as useTAMDataState } from '@edtrUI/ticketAssignmentsManager/data';
import useDataListener from './useDataListener';

// temporary
const buttonRowStyle: CSSProperties = { display: 'flex', justifyContent: 'flex-end', padding: '1rem 2rem' };

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
						{current === 0 && children}

						{current === 1 && <TicketAssignmentsManager />}
						<div style={buttonRowStyle}>
							{current === 0 && (
								<Button
									buttonText={__('Save and assign tickets')}
									onClick={next}
									isDisabled={isSaveDisabled}
									rightIcon='chevron-right'
								/>
							)}
							{current === 1 && (
								<>
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
