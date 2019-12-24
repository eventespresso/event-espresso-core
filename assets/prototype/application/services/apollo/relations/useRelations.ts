import { useContext } from 'react';
import { RelationsContext } from '../../context/RelationsProvider';
import { RelationsManager } from './types';

const useRelations = (): RelationsManager => {
	return useContext<RelationsManager>(RelationsContext);
};

export default useRelations;
