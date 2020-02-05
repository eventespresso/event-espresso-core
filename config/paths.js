'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const ASSETS = 'assets';
const SOURCE_FOLDER = 'src';
const appSrc = `./${ASSETS}/${SOURCE_FOLDER}`;

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
	const hasSlash = inputPath.endsWith('/');
	if (hasSlash && !needsSlash) {
		return inputPath.substr(0, inputPath.length - 1);
	} else if (!hasSlash && needsSlash) {
		return `${inputPath}/`;
	} else {
		return inputPath;
	}
}

const getPublicUrl = (appPackageJson) => envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
	const publicUrl = getPublicUrl(appPackageJson);
	const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
	return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
	'web.mjs',
	'mjs',
	'web.js',
	'js',
	'web.ts',
	'ts',
	'web.tsx',
	'tsx',
	'json',
	'web.jsx',
	'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
	const extension = moduleFileExtensions.find((extension) => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

	if (extension) {
		return resolveFn(`${filePath}.${extension}`);
	}

	return resolveFn(`${filePath}.js`);
};

const assetsPath = 'assets/ZZZ/';

// config after eject: we're in ./config/
module.exports = {
	appPath: resolveApp('.'),
	appBuild: resolveApp('assets/dist'),
	appPublic: resolveApp('public'),
	appHtml: resolveApp('public/index.html'),
	appIndexJs: resolveModule(resolveApp, `${appSrc}/domain/eventEditor/index`),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp(appSrc),
	appTsConfig: resolveApp('tsconfig.json'),
	appJsConfig: resolveApp('jsconfig.json'),
	appNodeModules: resolveApp('node_modules'),
	dotenv: resolveApp('.env'),
	entries: {
		'eejs-core': resolveModule(resolveApp, assetsPath + 'eejs/index'),
		'eventespresso-vendor': resolveModule(resolveApp, assetsPath + 'eejs/vendor/index'),
		'eventespresso-editor': resolveModule(resolveApp, assetsPath + 'editor/index'),
		'eventespresso-editor-prototype': resolveModule(resolveApp, './assets/src/domain/eventEditor/index'),
		// To be done as part of: https://github.com/eventespresso/event-espresso-core/issues/2250
		// 'ee-wp-plugins-page': resolveModule(resolveApp, assetsPath + 'wp-plugins-page/index'),
		// 'eventespresso-core-blocks': resolveModule(resolveApp, assetsPath + 'blocks/index'),
		// 'eventespresso-core-blocks-frontend': resolveModule(resolveApp, assetsPath + 'blocks/index-frontend'),
		'eventespresso-core-css-default': resolveModule(
			resolveApp,
			assetsPath + 'components/ui/styles/themes/default/index'
		),
	},

	proxySetup: resolveApp('src/setupProxy.js'),
	pathToDistFolder: path.resolve(ASSETS, 'dist') + '/',
	pathToEDTRv1: path.resolve(ASSETS, 'ZZZ') + '/',
	pathToPrototype: path.resolve(ASSETS, 'prototype') + '/',
	publicUrl: getPublicUrl(resolveApp('package.json')),
	servedPath: getServedPath(resolveApp('package.json')),
	testsSetup: resolveModule(resolveApp, 'src/setupTests'),
	yarnLockFile: resolveApp('yarn.lock'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
