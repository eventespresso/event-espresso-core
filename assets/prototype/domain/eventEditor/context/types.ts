import React from 'react';

export interface ContextProviderProps {
	children?: React.ReactNode;
}

export type ContextProvider = React.FC<ContextProviderProps>;
