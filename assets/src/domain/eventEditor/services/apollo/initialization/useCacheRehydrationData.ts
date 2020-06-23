import { EditorData } from '@edtrInterfaces/types';

const useCacheRehydrationData = (): EditorData => {
	const { currentUser, generalSettings } = window?.eventEspressoData?.config || {};
	const { event } = window?.eventEspressoData?.eventEditor || {};
	return { event, currentUser, generalSettings };
};

export default useCacheRehydrationData;
