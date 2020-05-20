const path = require('path');
const fs = require('fs');

const ASSETS_FOLDER = 'assets';
const DIST_FOLDER = 'dist';
const SOURCE_FOLDER = 'src';
const ASSETS_DIST_FOLDER = `${ASSETS_FOLDER}/${DIST_FOLDER}`;
const ASSETS_SOURCE_FOLDER = `${ASSETS_FOLDER}/${SOURCE_FOLDER}`;
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
	process.env.NODE_ENV === 'development',
	require(resolveApp('package.json')).homepage,
	process.env.PUBLIC_URL
);

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
	appIndexJs: resolveModule(resolveApp, ASSETS_SOURCE_FOLDER + `/domain/index`),
	appPackageJson: resolveApp('package.json'),
	appSrc: resolveApp(ASSETS_SOURCE_FOLDER),
	appTsConfig: resolveApp('tsconfig.json'),
	appJsConfig: resolveApp('jsconfig.json'),
	appNodeModules: resolveApp('node_modules'),
	dotenv: resolveApp('.env'),
	yarnLockFile: resolveApp('yarn.lock'),
	testsSetup: resolveModule(resolveApp, 'src/setupTests'),
	proxySetup: resolveApp('src/setupProxy.js'),
	publicUrlOrPath,
	entries: {
		'eventespresso-blocks': resolveModule(resolveApp, ASSETS_SOURCE_FOLDER + `/domain/blocks/index`),
		'eventespresso-core-app': resolveModule(resolveApp, ASSETS_SOURCE_FOLDER + `/domain/index`),
	},
};

module.exports.moduleFileExtensions = moduleFileExtensions;
