import { useState, useEffect, useCallback } from 'react';
import { isEmpty, isNil } from 'ramda';

import useOnSubmitPrices from './useOnSubmitPrices';
import useTicketPriceCalculatorFormDecorator from './useTicketPriceCalculatorFormDecorator';
import useTicketPriceCalculatorFormMutators from './useTicketPriceCalculatorFormMutators';
import TicketPriceCalculatorForm from '../TicketPriceCalculatorForm';
import useDefaultPriceType from '../../../data/queries/priceTypes/useDefaultPriceType';
import useTicketPrices from '../../../data/queries/tickets/useTicketPrices';
import useTicketItem from '../../../data/queries/tickets/useTicketItem';
import { Ticket, Price } from '../../../../eventEditor/data/types';
import { defaultNewPriceModifier } from '../../../../shared/entities/prices/defaultNewPriceModifier';
import { sortByPriceOrderIdAsc } from '../../../../shared/entities/prices/predicates/sortingPredicates';
import { copyPriceFields } from '../../../../shared/entities/prices/predicates/updatePredicates';
import { copyTicketFields } from '../../../../shared/entities/tickets/predicates/updatePredicates';
import {
	useEditorModal,
	EditorModal,
	EntityId,
	ModalClose,
} from '../../../../../application/ui/components/layout/editorModal';

interface TPCFormValues {
	ticket: Ticket;
	prices: Price[];
}

const INITIAL_STATE: TPCFormValues = {
	ticket: null,
	prices: [],
};

const useTicketPriceCalculatorModal: EditorModal = (ticketId: EntityId) => {
	const [initialValues, setInitialValues] = useState<TPCFormValues>(INITIAL_STATE);
	const decorator = useTicketPriceCalculatorFormDecorator();
	const mutators = useTicketPriceCalculatorFormMutators();
	const prices = useTicketPrices(ticketId);
	const defaultPriceType = useDefaultPriceType();
	const submitPrices = useOnSubmitPrices(prices);
	const ticket = useTicketItem({ id: ticketId });
	const { closeEditor } = useEditorModal();

	useEffect(() => {
		const updatable =
			(isEmpty(initialValues) || isNil(initialValues.ticket) || isEmpty(initialValues.ticket)) &&
			!isEmpty(prices);
		if (updatable) {
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

	const onClose = useCallback<ModalClose>((): void => {
		closeEditor('ticketPriceCalculator');
		setInitialValues(INITIAL_STATE);
	}, [closeEditor]);

	return {
		formComponent: TicketPriceCalculatorForm,
		onSubmit: submitPrices,
		initialValues,
		onClose,
		decorators: [decorator],
		mutators,
	};
};

export default useTicketPriceCalculatorModal;
