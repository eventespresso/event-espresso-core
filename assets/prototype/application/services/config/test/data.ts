import { JsDataProps } from '../types';

export const mockEeJsData: JsDataProps = {
	brandName: 'EE',
	currency_config: {
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
		user: 'mn_ZR',
		site: 'mn_ZR',
	},
	eejs_api_nonce: 'abc123',
	paths: {
		admin_url: '',
		site_url: '',
	},
	default_timezone: {
		pretty: 'ManZooria',
		string: 'Manzooropa/ManZooria',
		offset: +27.333,
	},
};
