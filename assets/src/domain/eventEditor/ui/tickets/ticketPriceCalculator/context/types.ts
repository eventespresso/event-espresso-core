import { ProviderProps as AppProviderProps } from '@appServices/context/types';
import { BaseProps } from '../types';
import { DataStateManager } from '../data';

export interface ExtraContextProps {
	onCloseModal?: VoidFunction;
}

export interface ProviderProps extends AppProviderProps, BaseProps, ExtraContextProps {}

export interface ContextProps extends ExtraContextProps {
	dataState: DataStateManager;
}

export interface WithContextProps extends ExtraContextProps, BaseProps {}
