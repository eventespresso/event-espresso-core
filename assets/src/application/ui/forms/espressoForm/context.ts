import { createContext } from 'react';
import { FormContextProps } from './types';

const Context = createContext<FormContextProps>({});

const { Provider } = Context;

export const FormProvider = Provider;

export default Context;
