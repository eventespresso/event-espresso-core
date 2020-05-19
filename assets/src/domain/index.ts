import './shared/services/publicPath';

const domain = window?.eeDomain;

if (domain) {
	import(
		/* webpackExclude: /(shared)/ */
		/* webpackChunkName: "[request]" */
		`./${domain}/entryPoint.ts`
	)
		.then(() => {
			console.log('domain', domain);
		})
		.catch(console.error);
} else {
	console.error('No domain supplied');
}
