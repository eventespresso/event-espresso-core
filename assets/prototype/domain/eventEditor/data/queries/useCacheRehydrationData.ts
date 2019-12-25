import { pathOr } from 'ramda';
import { GQLDOMData } from '../../types';

const useCacheRehydrationData = (): GQLDOMData => {
	const data = pathOr<GQLDOMData>(null, ['eeEditorGQLData'], window);
	return data;
};

export default useCacheRehydrationData;
