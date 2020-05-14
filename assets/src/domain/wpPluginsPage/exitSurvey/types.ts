export interface ExitSurveyInfo {
	typeFormUrl: string;
	isModalActive: boolean;
}

declare global {
	interface Window {
		eeExitSurveyInfo: ExitSurveyInfo;
	}
}
