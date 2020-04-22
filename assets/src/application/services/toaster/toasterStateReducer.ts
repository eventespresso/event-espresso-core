import { map, reject } from 'ramda';

import { dismissToast, hasKey, requestClose } from './utilities/reducerUtilities';
import { ToasterActionType, ToasterState, ToasterStateReducer, WithAnimationProps } from './types';

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
	return newState ? newState : state;
};
