/**
 * External imports
 */
import React, { createContext } from 'react';

import { ProviderProps } from './types';
import { Modal } from 'antd';
import { ModalStaticFunctions } from 'antd/lib/modal/confirm';

export type ModalInstance = Omit<ModalStaticFunctions, 'warn'>;

const ModalContext = createContext<ModalInstance | null>(null);

const { Provider, Consumer: ModalConsumer } = ModalContext;

const ModalProvider: React.FC<ProviderProps> = ({ children }) => {
	const [modal, contextHolder] = Modal.useModal();
	return (
		<Provider value={modal}>
			{contextHolder}
			{children}
		</Provider>
	);
};

export { ModalContext, ModalProvider, ModalConsumer };
