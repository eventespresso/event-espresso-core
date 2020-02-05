import { pathOr } from 'ramda';
import { EventData, EEEditorData } from '../../../interfaces';
import { CurrentUserProps, GeneralSettings } from '../../../../../application/valueObjects/types';

const useCacheRehydrationData = (): EEEditorData => {
	const event = pathOr<EventData>(null, ['eeEditorData', 'event'], window);
	const currentUser = pathOr<CurrentUserProps>(null, ['eeEditorData', 'currentUser'], window);
	const generalSettings = pathOr<GeneralSettings>(null, ['eeEditorData', 'generalSettings'], window);

	return { event, currentUser, generalSettings };
};

export default useCacheRehydrationData;
