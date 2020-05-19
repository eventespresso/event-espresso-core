import './shared/services/publicPath';

const domain = window?.eeDomain;

if (domain) {
	console.log(`%c importing: /domain/${domain}/entryPoint.ts`, 'color: SkyBlue;');
	import(
		/* webpackExclude: /(shared)/ */
		/* webpackChunkName: "[request]" */
		`./${domain}/entryPoint.ts`
	).catch(console.error);
} else {
	console.error('No domain supplied');
}
