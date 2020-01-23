import { useState, useEffect, useCallback } from 'react';
import { isEmpty } from 'ramda';

import {
	useEditorModal,
	EditorModal,
	EntityId,
	EditorModalCallback,
} from '../../../../../application/ui/components/layout/eeditorModal';
import { defaultNewPriceModifier } from '../../../../shared/entities/prices/defaultNewPriceModifier';
import { sortByPriceOrderIdAsc } from '../../../../shared/entities/prices/predicates/sortingPredicates';
import { copyPriceFields } from '../../../../shared/entities/prices/predicates/updatePredicates';
import { copyTicketFields } from '../../../../shared/entities/tickets/predicates/updatePredicates';
import TicketPriceCalculatorForm from '../TicketPriceCalculatorForm';
import useDefaultPriceType from '../../../data/queries/priceTypes/useDefaultPriceType';
import useOnSubmitPrices from './useOnSubmitPrices';
import useTicketPriceCalculatorFormDecorator from './useTicketPriceCalculatorFormDecorator';
import useTicketPriceCalculatorFormMutators from './useTicketPriceCalculatorFormMutators';
import useTicketPrices from '../../../data/queries/tickets/useTicketPrices';
import useTicketItem from '../../../data/queries/tickets/useTicketItem';

const EMPTY_OBJECT = {};

const useTicketPriceCalculatorModal: EditorModal = (ticketId: EntityId) => {
	const [initialValues, setInitialValues] = useState(EMPTY_OBJECT);
	const decorator = useTicketPriceCalculatorFormDecorator();
	const mutators = useTicketPriceCalculatorFormMutators();
	const prices = useTicketPrices(ticketId);
	const defaultPriceType = useDefaultPriceType();
	const submitPrices = useOnSubmitPrices(prices);
	const ticket = useTicketItem({ id: ticketId });

	const { closeEditor } = useEditorModal();

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

	return useCallback<EditorModalCallback>(() => {
		const onClose = (): void => {
			closeEditor('ticketPriceCalculator');
			setInitialValues(EMPTY_OBJECT);
		};

		return {
			formComponent: TicketPriceCalculatorForm,
			onSubmit: submitPrices,
			initialValues,
			onClose,
			decorators: [decorator],
			mutators,
		};
	}, [initialValues, ticketId, decorator, mutators, ticket]);
};

export default useTicketPriceCalculatorModal;
