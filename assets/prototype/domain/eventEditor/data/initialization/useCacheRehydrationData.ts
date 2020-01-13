import { pathOr } from 'ramda';
import { EventData } from '../../types';
import { CurrentUserProps, GeneralSettings } from '../../../../application/valueObjects/config/types';

interface RehydrationData extends EventData {
	currentUser?: CurrentUserProps;
	generalSettings?: GeneralSettings;
}

const useCacheRehydrationData = (): RehydrationData => {
	const eventData = pathOr<EventData>(null, ['eeEditorData', 'event'], window);
	const currentUser = pathOr<CurrentUserProps>(null, ['eeEditorData', 'currentUser'], window);
	const generalSettings = pathOr<GeneralSettings>(null, ['eeEditorData', 'generalSettings'], window);

	return { ...eventData, currentUser, generalSettings };
};

export default useCacheRehydrationData;
