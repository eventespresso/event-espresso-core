import { useContext } from '@wordpress/element';
import { StatusContext } from '../contextProviders/StatusProvider';

const useStatus = () => {
	return useContext(StatusContext);
};

export default useStatus;
