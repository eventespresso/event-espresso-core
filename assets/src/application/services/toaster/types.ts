import { TypeOptions } from 'react-toastify';
import { BoxProps } from '@infraUI/display';

type AddToastProps = Omit<ToastProps, 'timestamp' | 'loading'>;

export type Toast = (props: Partial<AddToastProps>) => void;

export type DissmissToast = (key: ToastKey) => void;

export type KeyGenerator = (key?: number | string, prefix?: string) => string;

export type onCloseFn = (event: React.MouseEvent) => void;

interface UpdateToastProps {
	message?: string;
	key: string | number;
	type: TypeOptions;
}

export type UpdateToast = (props: UpdateToastProps) => void;

export type SystemNotificationsToaster = {
	dismiss: DissmissToast;
	dissmissAll: () => void;
	error: Toast;
	info: Toast;
	loading: Toast;
	success: Toast;
	update: UpdateToast;
	warning: Toast;
};

export interface ToastAlertButtonProps {
	isClosable?: boolean;
	name?: string;
	onClose: (event: React.MouseEvent) => void;
}

export enum TOAST_STATUS {
	ERROR = 'ERROR',
	INFO = 'INFO',
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	WARNING = 'WARNING',
}

export type Toaster = {
	dissmiss: DissmissToast;
	dissmissAll: VoidFunction;
	exists: (key: ToastKey) => boolean;
};

export type Toasters = {
	systemNotifications: SystemNotificationsToaster;
};

export type ToastKey = string | number;

export interface ToastProps {
	autoClose?: number | false;
	className?: string;
	duration?: number;
	isClosable: boolean;
	key?: ToastKey;
	loading?: boolean;
	message: string;
	messageProps?: BoxProps;
	onClose: onCloseFn;
	style?: Partial<React.CSSProperties>;
	timestamp: number;
	titleProps?: BoxProps;
	toastId?: string | number;
	type: TypeOptions;
}

export interface ToasterProps {
	icon?: React.ReactNode;
	message?: string;
	type: TypeOptions | 'loading';
}

export interface ToastIconProps {
	type: ToastStatus;
}

export type ToastStatus = keyof typeof TOAST_STATUS;

export enum ToasterActionType {
	ADD = 'add',
	DISMISS = 'dismiss',
	DISMISS_ALL = 'dismiss_all',
	REMOVE = 'remove',
	REMOVE_ALL = 'remove_all',
}

export interface UseLoadingToastProps {
	dissmissToast: DissmissToast;
	exists: (key: ToastKey) => boolean;
}
