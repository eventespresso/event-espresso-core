import { useContext } from 'react';
import invariant from 'invariant';

import type { EdtrStateManager } from './types';
import { EdtrStateContext } from '@edtrServices/context/EdtrStateContext';

const useEdtrState = (): EdtrStateManager => {
	const value = useContext(EdtrStateContext);

	invariant(value, 'useEdtrState must be used inside <EdtrStateProvider> component');

	return value;
};

export default useEdtrState;
