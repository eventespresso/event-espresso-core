import { EventEspressoDomData } from '../../application/DomDataTypes';

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
