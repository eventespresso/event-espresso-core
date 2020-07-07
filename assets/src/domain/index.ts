import type { EventEspressoData } from './types';
import './shared/services/publicPath';

const eventEspressoData: EventEspressoData = window?.eventEspressoData;
const domain = eventEspressoData?.domain;

if (!domain) {
	console.error('No domain supplied');
} else if (domain !== 'blocks') {
	// todo remove this at some point in the future
	console.log(`%c importing: /domain/${domain}/entryPoint.ts`, 'color: SkyBlue;');
	import(
		/* webpackExclude: /(shared|blocks)/ */
		/* webpackChunkName: "[request]" */
		`./${domain}/entryPoint.ts`
	).catch(console.error);
}
