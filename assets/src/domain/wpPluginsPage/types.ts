import { EventEspressoDomData } from '../../application/services/config/types';

export interface WpPluginsPageData {
	eeExitSurveyInfo: ExitSurveyInfo;
}

export interface ExitSurveyInfo {
	typeFormUrl: string;
	isModalActive: boolean;
}

export interface WpPluginsPageDomData extends EventEspressoDomData {
	eeExitSurveyInfo: ExitSurveyInfo;
}
