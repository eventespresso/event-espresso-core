import { ProviderProps as AppProviderProps } from '@appServices/context/types';
import { DataStateManager, BaseProps } from '../types';
import { FilterStateManager } from '../filters/filterState';

export interface ProviderProps extends BaseProps, AppProviderProps {}

export interface ContextProps extends BaseProps {
	dataState: DataStateManager;
	filterState: FilterStateManager;
}
