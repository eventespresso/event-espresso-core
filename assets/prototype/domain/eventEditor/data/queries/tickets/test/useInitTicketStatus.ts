import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';

const useInitTicketStatus = (): void => {
	const { setIsLoaded, isLoaded } = useStatus();
	if (!isLoaded(TypeName.tickets)) {
		setIsLoaded(TypeName.tickets, true);
	}
};
export default useInitTicketStatus;
