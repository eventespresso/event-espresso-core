import type { EventEditorData } from './eventEditor/interfaces/types';
import type { WpPluginsPageData } from './wpPluginsPage/types';
import type {
	CurrencyProps,
	CurrentUserProps,
	GeneralSettings,
	LocaleProps,
	SiteUrlProps,
} from '@application/valueObjects/config/types';

/**
 * Contains the API related information
 */
export interface ApiData {
	restApiNonce?: string;
	restApiBaseUrl?: string;
	restApiRouteUrl?: string;
	graphqlEndpoint?: string;
}

/**
 * This can contain asset information like
 * - base URL to assets directory
 * - URLs to specific images like brand images etc.
 */
export interface AssetsData {
	url: string; // URL to assets directory
}

export interface ConfigData {
	// Better to name the type as "Currency" instead of "CurrencyProps"
	currency?: CurrencyProps;
	// Better to name the type as "CurrentUser" or just "User" instead of "CurrentUserProps"
	currentUser?: CurrentUserProps;
	generalSettings?: GeneralSettings;
	locale?: LocaleProps;
	siteUrl?: SiteUrlProps;
}

export interface I18nInfo {
	domain: string; // e.g. "event_espresso"
	lang: string; // e.g. "en_US"
	plural_forms?: string;
}

export type I18nData = {
	'': I18nInfo;
	[key: string]: any; // translation strings
};

/**
 * This is the global object
 */
export interface EventEspressoData {
	api: ApiData;
	assets: AssetsData;
	blocks: null; // we don't need anything specific yet
	config: ConfigData;
	domain: string; // e.g. "eventEditor" || "wpPluginsPage"
	eventEditor?: EventEditorData;
	i18n: I18nData;
	wpPluginsPage?: WpPluginsPageData;
}

declare global {
	interface Window {
		eventEspressoData: EventEspressoData;
	}
}

// example data
// window.eventEspressoData = {
// 	api: {
// 		nonce: 'uyfrfyuk',
// 		restBaseUrl: 'http://localhost/wp-json',
// 		graphqlEndpoint: 'http://localhost/graphql',
// 	},
// 	assets: {
// 		url: 'https://localhost/***/dist',
// 	},
// 	blocks: null,
// 	config: {
// 		currency: null,
// 		currentUser: null,
// 		generalSettings: {
// 			dateFormat: 'F j, Y',
// 			timeFormat: 'g:i a',
// 			timezone: 'Asia/Dubai',
// 		},
// 		locale: {
// 			user: 'en_US',
// 			site: 'en_US',
// 		},
// 		siteUrl: {
// 			admin: 'https://localhost/wp-admin',
// 			home: 'https://localhost',
// 		},
// 	},
// 	eventEditor: {
// 		event: null,
// 		datetimes: null,
// 		relations: {},
// 	},
// 	i18n: {
// 		'': {
// 			domain: 'event_espresso',
// 			lang: 'en_US',
// 		},
// 	},
// 	wpPluginsPage: {
// 		eeExitSurveyInfo: {
// 			isModalActive: true,
// 			typeFormUrl: 'https://...',
// 		},
// 	},
// };
