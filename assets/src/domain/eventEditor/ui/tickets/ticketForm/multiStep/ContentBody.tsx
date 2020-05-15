import React, { CSSProperties } from 'react';
import { __ } from '@wordpress/i18n';
import { FormRenderProps } from 'react-final-form';
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

	const prices = form.getState().values.prices || [];
	const isTPCSubmitDisabled = prices.length && prices.some(({ amount }) => anyPass([isNil, isEmpty])(amount));

	return (
		<div>
			<TicketFormSteps current={current} />
			{/* RFF fields */}
			{current === 0 && children}

			{current === 1 && <TicketPriceCalculator />}
			{current === 2 && <TicketAssignmentsManager />}
			<div style={buttonRowStyle}>
				{current === 0 && (
					<Button buttonText={__('Continue to price details')} onClick={next} isDisabled={isSaveDisabled} />
				)}
				{current === 1 && (
					<>
						<Button buttonText={__('Previous')} onClick={prev} />
						<Button
							buttonText={__('Save and assign dates')}
							onClick={next}
							isDisabled={isTPCSubmitDisabled}
						/>
					</>
				)}
				{current === 2 && (
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
