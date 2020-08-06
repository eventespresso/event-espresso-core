import { useDisclosure } from '@chakra-ui/core';

import { TicketPriceCalculator } from '../types';
import ModalContainer from '../components/ModalContainer';

const useTicketPriceCalculator = (): TicketPriceCalculator => {
	const disclosure = useDisclosure();

	return {
		...disclosure,
		ModalContainer,
	};
};

export default useTicketPriceCalculator;
