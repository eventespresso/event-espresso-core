import useDatetimeMutator from '../../../../domain/eventEditor/data/mutations/datetimes/useDatetimeMutator';
import useTicketMutator from '../../../../domain/eventEditor/data/mutations/tickets/useTicketMutator';
import usePriceMutator from '../../../../domain/eventEditor/data/mutations/prices/usePriceMutator';

const useMutators = () => {
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
