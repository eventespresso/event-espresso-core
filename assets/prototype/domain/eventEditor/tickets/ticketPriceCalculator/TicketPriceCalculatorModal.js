import isEmpty from 'ramda/src/isEmpty';
import { useEffect, useState } from 'react';

import TicketPriceCalculatorForm from './TicketPriceCalculatorForm';
import useTicketPriceCalculatorFormDecorator from './hooks/useTicketPriceCalculatorFormDecorator';
import useTicketPriceCalculatorFormMutators from './hooks/useTicketPriceCalculatorFormMutators';
import useOnSubmitPrices from './hooks/useOnSubmitPrices';
import { defaultNewPriceModifier } from '../../../shared/entities/prices/defaultNewPriceModifier';
import { sortByPriceOrderIdAsc } from '../../../shared/predicates/prices/sortingPredicates';
import { copyPriceFields } from '../../../shared/predicates/prices/updatePredicates';
import { copyTicketFields } from '../../../shared/predicates/tickets/updatePredicates';
import useTicketPrices from '../../data/queries/tickets/useTicketPrices';
import useDefaultPriceType from '../../data/queries/priceTypes/useDefaultPriceType';

import FormModal from '../../../../application/ui/components/forms/FormModal';

const EMPTY_OBJECT = {};

const TicketPriceCalculatorModal = ({ ticket, onClose, isOpen }) => {
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
			sortedPrices.push({ ...defaultNewPriceModifier, priceType: defaultPriceType.id });
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
