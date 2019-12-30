import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';

const useInitTicketStatus = (): void => {
	const { setIsLoaded, isLoaded } = useStatus();
	if (!isLoaded(TypeName.prices)) {
		setIsLoaded(TypeName.prices, true);
	}
};
export default useInitTicketStatus;
