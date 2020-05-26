import { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CreateTicketInput, UpdateTicketInput, DeleteTicketInput } from './types';
import { MutationType } from '@appServices/apollo/mutations';
import { CREATE_TICKET, UPDATE_TICKET, DELETE_TICKET } from './';
import useMutationHandler from './useMutationHandler';
import useUpdateCallback from '../useUpdateCallback';
import { MutationFunction, TypeName } from '../types';

interface TicketMutator {
	createEntity: MutationFunction<any, CreateTicketInput>;
	updateEntity: MutationFunction<any, UpdateTicketInput>;
	deleteEntity: MutationFunction<any, DeleteTicketInput>;
}

const useTicketMutator = (id = ''): TicketMutator => {
	const [createTicket] = useMutation(CREATE_TICKET);
	const [updateTicket] = useMutation(UPDATE_TICKET);
	const [deleteTicket] = useMutation(DELETE_TICKET);

	const mutationHandler = useMutationHandler();

	const getUpdateCallback = useUpdateCallback(TypeName.Ticket);

	const createEntity = useCallback(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Create, input);

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Create, input });

			return createTicket({ ...options, update });
		},
		[createTicket, getUpdateCallback, mutationHandler]
	);

	const updateEntity = useCallback(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Update, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Update, input });

			return updateTicket({ ...options, update });
		},
		[getUpdateCallback, id, mutationHandler, updateTicket]
	);

	const deleteEntity = useCallback(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Delete, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Delete, input });

			return deleteTicket({ ...options, update });
		},
		[deleteTicket, getUpdateCallback, id, mutationHandler]
	);
	return useMemo(() => ({ createEntity, updateEntity, deleteEntity }), [createEntity, deleteEntity, updateEntity]);
};

export default useTicketMutator;
