import type { EventEditorData } from './eventEditor/interfaces/types';
import type { WpPluginsPageData } from './wpPluginsPage/types';
import { EventEspressoDomData } from '@application/DomDataTypes';

/**
 * This is the global object
 */
export interface EventEspressoData extends EventEspressoDomData {
	eventEditor?: EventEditorData;
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
