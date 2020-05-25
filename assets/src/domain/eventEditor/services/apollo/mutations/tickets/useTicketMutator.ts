import { CreateTicketInput, DeleteTicketInput, UpdateTicketInput } from './types';
import { MutatorFnGn } from '@appServices/apollo/mutations';
import { useMutator, TypeName } from '../';

interface TicketMutator {
	createEntity: MutatorFnGn<CreateTicketInput>;
	updateEntity: MutatorFnGn<UpdateTicketInput>;
	deleteEntity: MutatorFnGn<DeleteTicketInput>;
}

const useTicketMutator = (id = ''): TicketMutator => {
	return useMutator(TypeName.Ticket, id) as TicketMutator;
};

export default useTicketMutator;
