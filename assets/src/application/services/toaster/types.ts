import { ApolloError } from 'apollo-client';
import { IToaster, IActionProps, ILinkProps } from '@blueprintjs/core';
import { ArgsProps } from 'antd/lib/notification';

export type ErrorIcon = 'globe-network' | 'layout-auto' | 'warning-sign' | JSX.Element;

export interface LoadingToastProps {
	message: ToasterMsg;
}

export type DismissToast = (toaster: IToaster, hash: ToasterHash) => DismissToastCallback;
export type DismissToastCallback = (message: ToasterMsg) => void;

export type ErrorToast = (toaster: IToaster, hash: ToasterHash) => ErrorToastCallback;
export type ErrorToastCallback = (props: ArgsProps) => void;

export type InfoToast = (toaster: IToaster, hash: ToasterHash) => InfoToastCallback;
export type InfoToastCallback = (props: ArgsProps) => void;

export type LoadingToast = (toaster: IToaster, hash: ToasterHash) => LoadingToastCallback;
export type LoadingToastCallback = (
	loading: boolean,
	message: ToasterMsg,
	timeout?: number,
	action?: ToasterAction,
	onDismiss?: OnDismissFn
) => void;

export type SuccessToast = (toaster: IToaster, hash: ToasterHash) => SuccessToastCallback;
export type SuccessToastCallback = (props: ArgsProps) => void;

export type ToasterInit = (props: ToasterInitProps) => ToasterInitCallbacks;
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
export type ToasterHash = () => string;
export type ToasterNotices = (loadingFlag: boolean, loadingError: ApolloError) => void;
export type ToasterMsg = string;

export interface ToasterHook {
	dismiss: DismissToastCallback;
	error: ErrorToastCallback;
	info: InfoToastCallback;
	loading: LoadingToastCallback;
	success: SuccessToastCallback;
	warning: WarningToastCallback;
}

export type WarningToast = (toaster: IToaster, hash: ToasterHash) => SuccessToastCallback;
export type WarningToastCallback = (props: ArgsProps) => void;
