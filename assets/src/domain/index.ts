import type { EventEspressoData } from './types';
import './shared/services/publicPath';

const eventEspressoData: EventEspressoData = window?.eventEspressoData;
const domain = eventEspressoData?.domain;

if (domain) {
	// todo remove console.log at some point in the future
	// console.log(
	// 	`%c importing: /domain/${domain}/entryPoint.ts with eventEspressoData: `,
	// 	'color: SkyBlue;',
	// 	eventEspressoData
	// );
	import(
		/* webpackExclude: /(shared|blocks)/ */
		/* webpackChunkName: "[request]" */
		`./${domain}/entryPoint.ts`
	).catch(console.error);
} else {
	console.error('No domain supplied');
}
