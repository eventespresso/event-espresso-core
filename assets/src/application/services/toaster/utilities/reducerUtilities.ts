import { assoc, propEq, when } from 'ramda';
import { ToastKey, WithAnimationProps } from '../types';

type predicate = (toast: WithAnimationProps) => boolean;
type mapper = (toast: WithAnimationProps) => WithAnimationProps;

export const hasKey = (key: ToastKey): predicate => propEq('key', key);

export const requestClose = (toast: WithAnimationProps): WithAnimationProps => assoc('requestClose', true, toast);

export const dismissToast = (key: ToastKey): mapper => when(hasKey(key), requestClose);
