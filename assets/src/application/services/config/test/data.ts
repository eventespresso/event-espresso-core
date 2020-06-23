import { EventEspressoDomData } from '../types';

export const mockEeJsData: EventEspressoDomData = {
	api: {
		graphqlEndpoint: 'http://www.dev.test/graphql',
		restApiBaseUrl: 'http://www.dev.test/wp-json/',
		restApiCollectionEndpoints: {
			answer: '/ee/v4.8.36/answers',
			attendee: '/ee/v4.8.36/attendees',
			change_log: '/ee/v4.8.36/change_logs',
			checkin: '/ee/v4.8.36/checkins',
			country: '/ee/v4.8.36/countries',
			// more...
		},
		restApiNonce: 'abc123',
		restApiPrimaryKeys: {
			answer: 'ANS_ID',
			attendee: 'ATT_ID',
			change_log: 'LOG_ID',
			checkin: 'CHK_ID',
			country: 'CNT_ISO',
			// more...
		},
		restApiRouteUrl: 'http://www.dev.test/wp-json/ee/v4.8.36/',
	},
	config: {
		coreDomain: {
			assetNamespace: 'event-espresso-core-espresso',
			brandName: 'Event Espresso',
			coreVersion: '4.10.7.rc.024',
			distributionAssetsPath: '/mnt/a/www/dev.test/wp-content/plugins/event-espresso-core/assets/dist/',
			distributionAssetsUrl: 'http://www.dev.test/wp-content/plugins/event-espresso-core/assets/dist/',
			pluginPath: '/mnt/a/www/dev.test/wp-content/plugins/event-espresso-core/',
			pluginUrl: 'http://www.dev.test/wp-content/plugins/event-espresso-core/',
		},
		currentUser: {
			description: '',
			email: 'chef@manzoor.com',
			firstName: 'Chef',
			id: '1c2h3ef4',
			lastName: 'Manzoor',
			locale: 'mn-ZR',
			name: 'Chef Manzoor',
			nicename: 'Chef Manzoor',
			nickname: 'Chef Manzoor',
			userId: 1,
			username: 'chef',
		},
		generalSettings: {
			dateFormat: 'j F Y',
			timeFormat: 'g:i a',
			timezone: 'Asia/Calcutta',
		},
		siteCurrency: {
			code: 'MZR',
			singularLabel: 'Zoorie',
			pluralLabel: 'Zooriez',
			sign: 'Z',
			signB4: true,
			decimalPlaces: 3,
			decimalMark: '::',
			thousandsSeparator: ':',
			subunits: 1000,
		},
		locale: {
			site: 'mn-ZR',
			siteTimezone: {
				city: 'Calcutta',
				name: 'Asia/Calcutta',
				offset: +5.5,
			},
			user: 'mn-ZR',
		},
		siteUrls: {
			admin: 'http://www.dev.test/wp-admin/',
			home: 'http://www.dev.test/',
		},
	},
	domain: 'eventEditor',
	eei18n: {
		Apr: 'Apr',
		April: 'April',
		Aug: 'Aug',
		August: 'August',
		Dec: 'Dec',
		December: 'December',
		// more...
	},
	i18n: {
		'': {
			domain: 'event_espresso',
			lang: 'en_CA',
		},
	},
};
