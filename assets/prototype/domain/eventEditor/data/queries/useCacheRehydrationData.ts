import { GQLDOMData } from '../../types';

const useCacheRehydrationData = (): GQLDOMData => {
	const { eeEditorGQLData = {} } = window;
	return eeEditorGQLData;
};

export default useCacheRehydrationData;
