import React from 'react';
import isEmpty from 'ramda/src/isEmpty';
import { useEffect, useState } from 'react';

import FormModal from '../../../../application/ui/components/forms/formModal/FormModal';

import { TpcButtonDataProps, TpcModalProps } from './types';
import { defaultNewPriceModifier } from '../../../shared/entities/prices/defaultNewPriceModifier';
import { sortByPriceOrderIdAsc } from '../../../shared/entities/prices/predicates/sortingPredicates';
import { copyPriceFields } from '../../../shared/entities/prices/predicates/updatePredicates';
import { copyTicketFields } from '../../../shared/entities/tickets/predicates/updatePredicates';
import TicketPriceCalculatorForm from './TicketPriceCalculatorForm';
import useDefaultPriceType from '../../data/queries/priceTypes/useDefaultPriceType';
import useOnSubmitPrices from './hooks/useOnSubmitPrices';
import useTicketPriceCalculatorFormDecorator from './hooks/useTicketPriceCalculatorFormDecorator';
import useTicketPriceCalculatorFormMutators from './hooks/useTicketPriceCalculatorFormMutators';
import useTicketPrices from '../../data/queries/tickets/useTicketPrices';

const EMPTY_OBJECT = {};

const TicketPriceCalculatorModal: React.FC<TpcButtonDataProps & TpcModalProps> = ({
	ticket,
	onClose,
	isOpen,
}): JSX.Element => {
	const [initialValues, setInitialValues] = useState(EMPTY_OBJECT);
	const decorator = useTicketPriceCalculatorFormDecorator();
	const mutators = useTicketPriceCalculatorFormMutators();
	const prices = useTicketPrices(ticket.id);
	const defaultPriceType = useDefaultPriceType();
	const submitPrices = useOnSubmitPrices(prices);

	useEffect(() => {
		if (initialValues === EMPTY_OBJECT && !isEmpty(prices)) {
			const sortedPrices = sortByPriceOrderIdAsc(prices);
			// make sure to set a valid priceType for new price.
			const newPriceModifier = { ...defaultNewPriceModifier, priceType: defaultPriceType.id };
			sortedPrices.push(newPriceModifier);
			const formData = {
				ticket: copyTicketFields(ticket),
				prices: sortedPrices.map(copyPriceFields),
			};
			setInitialValues(formData);
		}
	}, [prices, ticket]);

	return (
		initialValues !== EMPTY_OBJECT && (
			<FormModal
				FormComponent={TicketPriceCalculatorForm}
				initialValues={initialValues}
				isOpen={isOpen}
				onSubmit={submitPrices}
				onClose={onClose}
				decorators={[decorator]}
				mutators={mutators}
			/>
		)
	);
};

export default TicketPriceCalculatorModal;
