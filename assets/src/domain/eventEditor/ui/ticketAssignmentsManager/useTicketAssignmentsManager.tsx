import { useDisclosure } from '@chakra-ui/core';

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
