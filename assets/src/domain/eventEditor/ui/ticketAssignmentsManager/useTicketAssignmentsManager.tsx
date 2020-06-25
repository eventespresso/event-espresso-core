import { useDisclosure } from '@chakra-ui/hooks';

import { TicketAssignmentsManager as TAM } from './types';
import ModalContainer from './components/ModalContainer';

const useTicketAssignmentsManager = (): TAM => {
	const disclosure = useDisclosure();

	return {
		...disclosure,
		ModalContainer,
	};
};

export default useTicketAssignmentsManager;
