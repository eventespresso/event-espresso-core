import { useContext } from 'react';
import { Toaster } from './types';

import { ToastContext } from '../context/ToastProvider';

const useToaster = (): Toaster => {
	return useContext<Toaster>(ToastContext);
};

export default useToaster;
