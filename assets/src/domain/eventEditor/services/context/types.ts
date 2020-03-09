import React from 'react';

import { EntityId } from '@appServices/apollo/types';

export interface ContextProviderProps {
	children?: React.ReactNode;
}

export interface EntityContextProps extends ContextProviderProps {
	id: EntityId;
}

export interface EntityListContextProps<T> extends ContextProviderProps {
	filters: T;
}

export interface EntityContextProviderProps extends ContextProviderProps, EntityContextProps {}

export type ContextProvider = React.FC<ContextProviderProps>;

export type EntityContextProvider = React.FC<EntityContextProviderProps>;
