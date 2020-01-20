import useDatetimeMutator from './datetimes/useDatetimeMutator';
import useTicketMutator from './tickets/useTicketMutator';
import usePriceMutator from './prices/usePriceMutator';
import { Mutators, Mutator } from '../../../../application/services/apollo/mutations/types';

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
