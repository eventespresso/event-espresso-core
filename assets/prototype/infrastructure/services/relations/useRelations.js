import { useContext } from '@wordpress/element';
import { RelationsContext } from '../contextProviders/RelationsProvider';

const useRelations = () => {
	return useContext(RelationsContext);
};

export default useRelations;
