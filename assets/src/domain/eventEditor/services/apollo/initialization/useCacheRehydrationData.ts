import { EEEditorData } from '@edtrInterfaces/types';

const useCacheRehydrationData = (): EEEditorData => {
	const { event, currentUser, generalSettings } = window?.eeEditorData || {};

	return { event, currentUser, generalSettings };
};

export default useCacheRehydrationData;
