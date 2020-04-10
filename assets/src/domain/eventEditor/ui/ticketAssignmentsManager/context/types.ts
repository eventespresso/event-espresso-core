import { DataStateManager, BaseProps } from '../types';
import { FilterStateManager } from '../filters/filterState';

export interface ExtraContextProps {
	onCloseModal?: VoidFunction;
}

export interface ProviderProps extends BaseProps, ExtraContextProps {}

export interface ContextProps extends BaseProps, ExtraContextProps {
	dataState: DataStateManager;
	filterState: FilterStateManager;
}

export interface WithContextProps extends ExtraContextProps, BaseProps {}
