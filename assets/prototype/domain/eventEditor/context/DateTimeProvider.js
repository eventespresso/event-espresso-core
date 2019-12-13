/**
 * External imports
 */
import { createContext, useState } from '@wordpress/element';

export const DateTimeContext = createContext({});

const DateTimeProvider = ({ children, id }) => {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const value = {
		id,
		isOpen,
		onClose,
		setIsOpen,
	};

	return <DateTimeContext.Provider value={value}>{children}</DateTimeContext.Provider>;
};

export default DateTimeProvider;
