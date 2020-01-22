import { ApolloError } from 'apollo-client';
import { IToaster, IActionProps, ILinkProps } from '@blueprintjs/core';

export type ErrorIcon = 'globe-network' | 'layout-auto' | 'warning-sign' | JSX.Element;

export interface LoadingToastProps {
	message: ToasterMsg;
}

export type DismissToast = (toaster: IToaster, hash: ToasterHash) => DismissToastCallback;
export type DismissToastCallback = (message: ToasterMsg) => void;

export type ErrorToast = (toaster: IToaster, hash: ToasterHash) => ErrorToastCallback;
export type ErrorToastCallback = (
	message: ToasterMsg | ApolloError,
	timeout?: number,
	action?: ToasterAction,
	onDismiss?: OnDismissFn
) => void;

export type InfoToast = (toaster: IToaster, hash: ToasterHash) => InfoToastCallback;
export type InfoToastCallback = (
	message: ToasterMsg,
	timeout?: number,
	action?: ToasterAction,
	onDismiss?: OnDismissFn
) => void;

export type LoadingToast = (toaster: IToaster, hash: ToasterHash) => LoadingToastCallback;
export type LoadingToastCallback = (
	loading: boolean,
	message: ToasterMsg,
	timeout?: number,
	action?: ToasterAction,
	onDismiss?: OnDismissFn
) => void;

export type SuccessToast = (toaster: IToaster, hash: ToasterHash) => SuccessToastCallback;
export type SuccessToastCallback = (
	message: ToasterMsg,
	timeout?: number,
	action?: ToasterAction,
	onDismiss?: OnDismissFn
) => void;

export type ToasterInit = (props: ToasterInitProps) => void;
export interface ToasterInitProps {
	loadingMessage: string;
	successMessage: string;
}
export type ToasterInitCallbacks = {
	onCompleted: () => void;
	onError: (error: ApolloError) => void;
	initializationNotices: ToasterNotices;
};

type OnDismissFn = (didTimeoutExpire: boolean) => void;
type ToasterAction = IActionProps & ILinkProps;
export type ToasterHash = (message: ToasterMsg) => string;
export type ToasterNotices = (loadingFlag: boolean, loadingError: ApolloError) => void;
export type ToasterMsg = string;

export interface ToasterHook {
	dismiss: DismissToastCallback;
	error: ErrorToastCallback;
	info: InfoToastCallback;
	loading: LoadingToastCallback;
	success: SuccessToastCallback;
}
