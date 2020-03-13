import { useDatesFilterBarService, useTicketsFilterBarService } from '@edtrServices/filterState';

const useFilterBarService = (): void => {
	useDatesFilterBarService();
	useTicketsFilterBarService();
};

export default useFilterBarService;
