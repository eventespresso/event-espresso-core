import { pathOr } from 'ramda';
import { EventData } from '../../../interfaces/types';
import { CurrentUserProps, GeneralSettings } from '@application/valueObjects/config/types';
import { EEEditorData } from '@edtrInterfaces/types';

const useCacheRehydrationData = (): EEEditorData => {
	const event = pathOr<EventData>(null, ['eeEditorData', 'event'], window);
	const currentUser = pathOr<CurrentUserProps>(null, ['eeEditorData', 'currentUser'], window);
	const generalSettings = pathOr<GeneralSettings>(null, ['eeEditorData', 'generalSettings'], window);

	return { event, currentUser, generalSettings };
};

export default useCacheRehydrationData;
