import React, { useCallback, useState } from 'react';

import { BaseProps, TicketPriceCalculatorModalHook } from '../types';
import TicketPriceCalculatorModal from '../components/TicketPriceCalculatorModal';
import { withContext } from '../context';

const useTicketPriceCalculatorModal: TicketPriceCalculatorModalHook = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const Container: React.FC<BaseProps> = (props) => {
		const onCloseModal = useCallback(() => setIsModalVisible(false), []);

		return isModalVisible && withContext(TicketPriceCalculatorModal, { ...props, onCloseModal });
	};

	const openModal = () => setIsModalVisible(true);

	return {
		openModal,
		Container,
	};
};

export default useTicketPriceCalculatorModal;
