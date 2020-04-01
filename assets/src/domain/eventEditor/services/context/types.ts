import React from 'react';

import { Entity, EntityId } from '@appServices/apollo/types';
import { EntityListFilterStateManager } from '@appLayout/entityList';

type ELFSM = EntityListFilterStateManager<any>;

export interface ContextProviderProps {
	children?: React.ReactNode;
}

export interface EntityContextProps extends ContextProviderProps {
	id: EntityId;
}

export interface EntityListContextProps<FS extends ELFSM, E extends Entity> extends ContextProviderProps {
	filterState: FS;
	filteredEntities: Array<E>;
}

export interface EntityContextProviderProps extends ContextProviderProps, EntityContextProps {}

export type ContextProvider = React.FC<ContextProviderProps>;

export type EntityContextProvider = React.FC<EntityContextProviderProps>;
