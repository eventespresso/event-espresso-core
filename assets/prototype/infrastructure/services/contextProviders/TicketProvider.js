/**
 * External imports
 */
import { createContext, useState } from '@wordpress/element';

export const TicketContext = createContext({});

const TicketProvider = ({ children, id, relatedDates }) => {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const value = {
		id,
		isOpen,
		onClose,
		relatedDates,
		setIsOpen,
	};

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
