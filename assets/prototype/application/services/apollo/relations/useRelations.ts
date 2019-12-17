import { useContext } from '@wordpress/element';
import { RelationsContext } from '../../context/RelationsProvider';
import { RelationsManager } from './types';

const useRelations = (): RelationsManager => {
	return useContext(RelationsContext);
};

export default useRelations;
