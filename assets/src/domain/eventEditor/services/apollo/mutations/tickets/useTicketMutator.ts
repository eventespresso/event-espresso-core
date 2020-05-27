import { useCallback, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { CreateTicketInput, UpdateTicketInput, DeleteTicketInput } from './types';
import { MutationType } from '@appServices/apollo/mutations';
import { CREATE_TICKET, UPDATE_TICKET, DELETE_TICKET } from './';
import useMutationHandler from './useMutationHandler';
import useUpdateCallback from '../useUpdateCallback';
import { MutationFunction, TypeName } from '../types';
import { CreateTicketResult, UpdateTicketResult, DeleteTicketResult } from './types';

interface TicketMutator {
	createEntity: MutationFunction<CreateTicketResult, CreateTicketInput>;
	updateEntity: MutationFunction<UpdateTicketResult, UpdateTicketInput>;
	deleteEntity: MutationFunction<DeleteTicketResult, DeleteTicketInput>;
}

type TM = TicketMutator;

const useTicketMutator = (id = ''): TM => {
	const [createTicket] = useMutation(CREATE_TICKET);
	const [updateTicket] = useMutation(UPDATE_TICKET);
	const [deleteTicket] = useMutation(DELETE_TICKET);

	const mutationHandler = useMutationHandler();

	const getUpdateCallback = useUpdateCallback(TypeName.Ticket);

	const createEntity = useCallback<TM['createEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Create, input);

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Create, input });

			return createTicket({ ...options, update });
		},
		[createTicket, getUpdateCallback, mutationHandler]
	);

	const updateEntity = useCallback<TM['updateEntity']>(
		(input) => {
			const { onUpdate, ...options } = mutationHandler(MutationType.Update, { id, ...input });

			const update = getUpdateCallback({ onUpdate, mutationType: MutationType.Update, input });

			return updateTicket({ ...options, update });
		},
		[getUpdateCallback, id, mutationHandler, updateTicket]
	);

	const deleteEntity = useCallback<TM['deleteEntity']>(
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
