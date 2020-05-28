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
		user: 'mn-ZR',
		site: 'mn-ZR',
	},
	eejs_api_nonce: 'abc123',
	paths: {
		admin_url: '',
		site_url: '',
	},
	default_timezone: {
		pretty: 'Calcutta',
		string: 'Asia/Calcutta',
		offset: +5.5,
	},
};
