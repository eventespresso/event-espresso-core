import { useContext } from '@wordpress/element';
import { StatusContext } from '../../context/StatusProvider';

const useStatus = () => {
	return useContext(StatusContext);
};

export default useStatus;
