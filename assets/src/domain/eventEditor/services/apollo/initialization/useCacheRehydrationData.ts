import { EditorData, EventEditorData } from '@edtrInterfaces/types';

const useCacheRehydrationData = (): EditorData => {
	const { currentUser, generalSettings } = window?.eventEspressoData?.config || {};
	const eventEditor: EventEditorData = window?.eventEspressoData?.eventEditor || {};
	return { currentUser, eventEditor, generalSettings };
};

export default useCacheRehydrationData;
