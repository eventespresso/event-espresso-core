import React from 'react';

import { Entity, EntityId } from '@appServices/apollo/types';

export interface ContextProviderProps {
	children?: React.ReactNode;
}

export interface EntityContextProps extends ContextProviderProps {
	id: EntityId;
}

export interface EntityListContextProps<E extends Entity, T> extends ContextProviderProps {
	allEntities: E[];
	filters: T;
	entities: E[];
	setEntities: (entities: E[]) => void;
}

export interface EntityContextProviderProps extends ContextProviderProps, EntityContextProps {}

export type ContextProvider = React.FC<ContextProviderProps>;

export type EntityContextProvider = React.FC<EntityContextProviderProps>;
