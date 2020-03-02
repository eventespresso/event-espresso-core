import { useContext } from 'react';
import { TAMContext } from './TAMProvider';
import { TAMStateManager } from './types';

const useTAMState = (): TAMStateManager => {
	return useContext<TAMStateManager>(TAMContext);
};

export default useTAMState;
