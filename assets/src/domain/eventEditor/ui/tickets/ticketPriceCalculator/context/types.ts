import { ProviderProps as AppProviderProps } from '@appServices/context/types';
import { BaseProps } from '../types';

export interface ProviderProps extends BaseProps, AppProviderProps {}

export interface ContextProps extends BaseProps {
	dataState: any;
}
