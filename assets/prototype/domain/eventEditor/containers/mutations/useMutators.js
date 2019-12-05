import useDatetimeMutator from './useDatetimeMutator';

const useMutators = () => {
	const datetimeMutator = useDatetimeMutator();
	// const ticketMutator = useTicketMutator();
	// const priceMutator = usePriceMutator();

	return {
		datetimeMutator,
		// ticketMutator,
		// priceMutator,
	};
};

export default useMutators;
