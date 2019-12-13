import { useContext } from '@wordpress/element';
import { RelationsContext } from '../../context/RelationsProvider';

const useRelations = () => {
	return useContext(RelationsContext);
};

export default useRelations;
