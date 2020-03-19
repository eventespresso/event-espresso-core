import { useContext } from 'react';
import { Context } from './ContextProvider';
import { ContextProps } from './types';
import invariant from 'invariant';

const useTAMContext = (): ContextProps => {
	const value = useContext(Context);

	invariant(value, 'useTAMContext must be used inside TAM <ContextProvider> component');

	return value;
};

export default useTAMContext;
