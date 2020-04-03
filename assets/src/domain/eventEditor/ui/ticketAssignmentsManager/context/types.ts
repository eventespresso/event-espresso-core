import { DataStateManager, BaseProps } from '../types';
import { FilterStateManager } from '../filters/filterState';

export interface ProviderProps extends BaseProps {}

export interface ContextProps extends BaseProps {
	dataState: DataStateManager;
	filterState: FilterStateManager;
}
