import useDatetimeMutator from '../../../../domain/eventEditor/data/mutations/datetimes/useDatetimeMutator';
import useTicketMutator from '../../../../domain/eventEditor/data/mutations/tickets/useTicketMutator';
import usePriceMutator from '../../../../domain/eventEditor/data/mutations/prices/usePriceMutator';
import { Mutators, Mutator } from './types';

const useMutators = (): Mutators => {
	const datetimeMutator: Mutator = useDatetimeMutator();
	const ticketMutator: Mutator = useTicketMutator();
	const priceMutator: Mutator = usePriceMutator();

	return {
		datetimeMutator,
		ticketMutator,
		priceMutator,
	};
};

export default useMutators;
