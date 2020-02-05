import useDatetimeMutator from './datetimes/useDatetimeMutator';
import useTicketMutator from './tickets/useTicketMutator';
import usePriceMutator from './prices/usePriceMutator';
import { Mutators } from '../../../../application/services/apollo/mutations/types';

const useMutators = (): Mutators => {
	const datetimeMutator = useDatetimeMutator();
	const ticketMutator = useTicketMutator();
	const priceMutator = usePriceMutator();

	return {
		datetimeMutator,
		ticketMutator,
		priceMutator,
	};
};

export default useMutators;
