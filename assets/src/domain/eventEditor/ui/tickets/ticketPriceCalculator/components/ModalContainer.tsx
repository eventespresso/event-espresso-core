import React from 'react';

import TicketPriceCalculatorModal from './TicketPriceCalculatorModal';
import { ModalContainerProps } from '../types';
import { withContext } from '../context';

const ModalContainer: React.FC<ModalContainerProps> = ({ isOpen, onClose, ...props }) => {
	return isOpen && withContext(TicketPriceCalculatorModal, { ...props, onClose });
};

export default ModalContainer;
