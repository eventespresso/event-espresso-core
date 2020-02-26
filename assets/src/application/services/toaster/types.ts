import { ArgsProps, ConfigProps, NotificationInstance } from 'antd/lib/notification';
import { v4 as uuidv4Interface } from 'uuid/interfaces';

export interface ToastManagerProps extends ConfigProps {
	maxToasts?: number;
}

export interface Toaster extends Omit<NotificationInstance, 'open'> {
	loading: (args: ArgsProps) => void;
	dismiss: (key: string) => void;
	isToastOpen: (key: string) => boolean;
	generateKey: uuidv4Interface;
}

export interface LoadingToastProps {
	toastKey: string;
	loading: boolean;
	message: string;
}
