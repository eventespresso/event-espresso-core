import { MutatorFnGn } from '@appServices/apollo/mutations';
import { useMutator, TypeName } from '../';
import { Ticket } from '../../types';
import { CreateTicketInput, UpdateTicketInput, DeleteTicketInput } from './types';

interface TicketMutator {
	createEntity: MutatorFnGn<CreateTicketInput>;
	updateEntity: MutatorFnGn<UpdateTicketInput>;
	deleteEntity: MutatorFnGn<DeleteTicketInput>;
}

const useTicketMutator = (id = ''): TicketMutator => {
	return useMutator<Ticket>(TypeName.Ticket, id) as TicketMutator;
};

export default useTicketMutator;
