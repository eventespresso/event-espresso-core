/**
 * External imports
 */
import { createContext, useState } from '@wordpress/element';

export const TicketContext = createContext({});

const TicketProvider = ({ children, id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const value = {
		id,
		isOpen,
		onClose,
		setIsOpen,
	};

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
