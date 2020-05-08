'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const ASSETS = 'assets';
const ASSETS_FOLDER = 'assets';
const DIST_FOLDER = 'dist';
const SOURCE_FOLDER = 'src';
const ASSETS_DIST_FOLDER = `${ASSETS_FOLDER}/${DIST_FOLDER}`;
const ASSETS_SOURCE_FOLDER = `${ASSETS_FOLDER}/${SOURCE_FOLDER}`;

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

// config after eject: we're in ./config/
module.exports = {
	appPath: resolveApp('.'),
	appBuild: resolveApp(ASSETS_DIST_FOLDER),
	appPublic: resolveApp('public'),
	appHtml: resolveApp('public/index.html'),
	appIndexJs: resolveModule(resolveApp, ASSETS_SOURCE_FOLDER + `/domain/eventEditor/index`),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp(ASSETS_SOURCE_FOLDER),
	appTsConfig: resolveApp('tsconfig.json'),
	appJsConfig: resolveApp('jsconfig.json'),
	appNodeModules: resolveApp('node_modules'),
	dotenv: resolveApp('.env'),
	entries: {
		'eventespresso-editor': resolveModule(resolveApp, ASSETS_SOURCE_FOLDER + '/domain/eventEditor/index'),
		'eventespresso-blocks': resolveModule(resolveApp, ASSETS_SOURCE_FOLDER + '/domain/blocks/index'),
		'eventespresso-wp-plugins-page': resolveModule(resolveApp, ASSETS_SOURCE_FOLDER + '/domain/wpPluginsPage/index'),
		// To be done as part of: https://github.com/eventespresso/event-espresso-core/issues/2250
		// 'ee-wp-plugins-page': resolveModule(resolveApp, assetsPath + 'wp-plugins-page/index'),
		// 'eventespresso-core-blocks': resolveModule(resolveApp, assetsPath + 'blocks/index'),
		// 'eventespresso-core-blocks-frontend': resolveModule(resolveApp, assetsPath + 'blocks/index-frontend'),
	},

	proxySetup: resolveApp('src/setupProxy.js'),
	pathToDistFolder: path.resolve(ASSETS, DIST_FOLDER) + '/',
	publicUrl: getPublicUrl(resolveApp('package.json')),
	servedPath: getServedPath(resolveApp('package.json')),
	testsSetup: resolveModule(resolveApp, 'src/setupTests'),
	yarnLockFile: resolveApp('yarn.lock'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
