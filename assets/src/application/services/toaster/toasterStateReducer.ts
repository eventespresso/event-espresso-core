import { assoc, map, propEq, reject, when } from 'ramda';
import { ToasterActionType, ToastKey, ToasterState, ToasterStateReducer, WithAnimationProps } from './types';

type predicate = (toast: WithAnimationProps) => boolean;
type mapper = (toast: WithAnimationProps) => WithAnimationProps;

const hasKey = (key: ToastKey): predicate => propEq('key', key);
const requestClose = (toast: WithAnimationProps): WithAnimationProps => assoc('requestClose', true, toast);
const dismissToast = (key: ToastKey): mapper => when(hasKey(key), requestClose);

export const toasterStateReducer: ToasterStateReducer = (state, action) => {
	let newState: ToasterState;
	switch (action.type) {
		case ToasterActionType.ADD:
			// since toasts are sorted by timestamp, any new toast should just be appended
			newState = [...state, action.toast];
			break;

		case ToasterActionType.DISMISS:
			newState = map(dismissToast(action.key), state);
			break;

		case ToasterActionType.DISMISS_ALL:
			newState = map(requestClose, state);
			break;

		case ToasterActionType.REMOVE:
			newState = reject<WithAnimationProps>(hasKey(action.key), state);
			break;

		case ToasterActionType.REMOVE_ALL:
			newState = [];
			break;
	}
	console.log('%c ToasterStateReducer action', 'color: Yellow;', action);
	console.log('%c ToasterStateReducer newState', 'color: LimeGreen;', newState);
	return newState ? newState : state;
};
