import './shared/services/publicPath';

const domain = window?.eeDomain;

if (domain) {
	// todo remove this at some point in the future
	console.log(`%c importing: /domain/${domain}/entryPoint.ts`, 'color: SkyBlue;');
	import(
		/* webpackExclude: /(shared|blocks)/ */
		/* webpackChunkName: "[request]" */
		`./${domain}/entryPoint.ts`
	).catch(console.error);
} else {
	console.error('No domain supplied');
}
