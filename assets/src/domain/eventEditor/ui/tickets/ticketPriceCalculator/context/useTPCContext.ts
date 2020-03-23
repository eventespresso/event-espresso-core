import { useContext } from 'react';
import { Context } from './ContextProvider';
import { ContextProps } from './types';
import invariant from 'invariant';

const useTPCContext = (): ContextProps => {
	const value = useContext(Context);

	invariant(value, 'useTPCContext must be used inside TPC <ContextProvider> component');

	return value;
};

export default useTPCContext;
