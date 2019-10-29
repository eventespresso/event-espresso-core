/**
 * External imports
 */
import { useState } from '@wordpress/element';

/**
 * @return {Object} object for tracking ticket form loading state
 * @member {boolean} loadingTicketForm
 * @member {Function} setLoadingTicketForm
 */
const useTicketFormLoadingState = () => {
	const [ loading, setLoading ] = useState( false );
	return {
		loadingTicketForm: loading,
		setLoadingTicketForm: setLoading,
	};
};

export default useTicketFormLoadingState;
