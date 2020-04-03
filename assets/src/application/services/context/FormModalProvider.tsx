import React, { createContext } from 'react';

import { useFormModalManager } from '../../ui/layout/formModal';

const FormModalContext = createContext(null);

const { Provider, Consumer: FormModalConsumer } = FormModalContext;

const FormModalProvider: React.FC = (props) => {
	const formModal = useFormModalManager();

	return <Provider value={formModal}>{props.children}</Provider>;
};

export { FormModalContext, FormModalProvider, FormModalConsumer };
