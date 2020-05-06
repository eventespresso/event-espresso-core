import { BoxProps } from '@infraUI/display';

type AddToastProps = Omit<ToastProps, 'timestamp' | 'loading'>;
export type LoadingToastProps = Partial<Omit<ToastProps, 'timestamp'>>;
export type AddToast = (props: Partial<AddToastProps>) => ToastKey;
export type DissmissToast = (key: ToastKey) => void;
export type LoadingToast = (props: LoadingToastProps) => ToastKey;
export type GetToasts = () => ToastPositions;
export type KeyGenerator = (key?: number | string, prefix?: string) => string;
export type onCloseFn = (event: React.MouseEvent) => void;

export const POSITIONS = {
	top: 'top',
	'top-left': 'top-left',
	'top-right': 'top-right',
	bottom: 'bottom',
	'bottom-left': 'bottom-left',
	'bottom-right': 'bottom-right',
};

export type PositionsType = keyof typeof POSITIONS;

export type SystemNotificationsManager = (options?: UseToasterProps) => SystemNotificationsToaster;

export type SystemNotificationsToaster = {
	dismiss: DissmissToast;
	dissmissAll: VoidFunction;
	error: AddToast;
	generateKey: KeyGenerator;
	info: AddToast;
	loading: LoadingToast;
	getToasts: GetToasts;
	success: AddToast;
	warning: AddToast;
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
	addToast: AddToast;
	dissmiss: DissmissToast;
	dissmissAll: VoidFunction;
	exists: (key: ToastKey) => boolean;
	generateKey: KeyGenerator;
	getToasts: GetToasts;
};

export type Toasters = {
	systemNotifications: SystemNotificationsToaster;
};

export type ToastKey = string;

export interface ToastProps {
	className?: string;
	duration?: number;
	isClosable: boolean;
	key: ToastKey;
	loading?: boolean;
	message: string;
	messageProps?: BoxProps;
	onClose: onCloseFn;
	position: PositionsType;
	style?: Partial<React.CSSProperties>;
	timestamp: number;
	title?: string;
	titleProps?: BoxProps;
	type: ToastStatus;
}

export interface ToastIconProps {
	type: ToastStatus;
}

export type ToastStatus = keyof typeof TOAST_STATUS;

export interface ToasterPositionProps {
	position: PositionsType;
	toasts: WithAnimationProps[];
}

export type ToasterState = Array<WithAnimationProps>;

export type ToastPositions = {
	'top-left': Array<WithAnimationProps>;
	top: Array<WithAnimationProps>;
	'top-right': Array<WithAnimationProps>;
	'bottom-left': Array<WithAnimationProps>;
	bottom: Array<WithAnimationProps>;
	'bottom-right': Array<WithAnimationProps>;
};

export enum ToasterActionType {
	ADD = 'add',
	DISMISS = 'dismiss',
	DISMISS_ALL = 'dismiss_all',
	REMOVE = 'remove',
	REMOVE_ALL = 'remove_all',
}

export interface ToasterStateAction {
	key?: ToastKey;
	toast?: WithAnimationProps;
	type: ToasterActionType;
}

export type ToasterStateReducer = (state: ToasterState, action: ToasterStateAction) => ToasterState;

export interface UseLoadingToastProps {
	addToast: AddToast;
	dissmissToast: DissmissToast;
	exists: (key: ToastKey) => boolean;
}

export interface UseToasterProps {
	duration?: number;
	isClosable?: boolean;
	position?: keyof typeof POSITIONS;
	toastKeyPrefix?: string;
}
export type UseToaster = (props?: UseToasterProps) => Toaster;

export type UseToasterStateManager = () => UseToasterStateManagerAPI;

export type UseToasterStateManagerAPI = {
	add: (toast: ToastProps) => void;
	dissmiss: (key: ToastKey) => void;
	dissmissAll: VoidFunction;
	exists: (key: ToastKey) => boolean;
	remove: (key: ToastKey) => void;
	removeAll: VoidFunction;
	toasterState: ToasterState;
};

export interface WithAnimationProps extends Omit<ToastProps, 'loading'> {
	onRequestRemove: VoidFunction;
	requestClose: boolean;
}
