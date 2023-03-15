import path from 'path';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import pkg from 'lodash';
const { startCase } = pkg;
import { fileURLToPath } from 'url';

// helper for getting Css files
import colorUtils from './color-utils.js';
import fileUtils from './file-utils.js';
import buildColorStylesheets from './build-color-stylesheets.js';
import buildSizesStylesheets from './build-sizes-stylesheets.js';
import getCssFiles from './get-css-files.js';
import buildSectionTemplates from './build-section-templates.js';
import getIndexPaths from './get-index-paths.js';

const { readFile, parseCssTemplate, writeFile } = fileUtils;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// constants;
const DEMO_TEMPLATES_PATH = path.resolve(__dirname, 'demo-templates');
const CSS_TEMPLATES_PATH = path.resolve(__dirname, 'css-templates');
const STYLES_DIRECTORY = path.resolve(__dirname, '../../assets/src/components/ui/styles');
import themeConfig from '../../assets/src/components/ui/styles/themes/default/config.js';

// @todo eventually the themes will be looped through, but for now we're just
// setting up the main default theme.

/**
 * Writes the stylesheet file
 *
 * @param {Object} config
 * @return {Object} config
 */
function setDefaultValues(config) {
	config.meta.background = config.meta.background ? config.meta.background : '#ffffff';
	config.meta.darkTheme = colorUtils.isDarkTheme(config.meta.background);
	config.meta.rgbModifier = config.meta.rgbModifier ? config.meta.rgbModifier : { r: 32, g: 32, b: 32 };
	config.meta.blackAndWhiteContrast = config.meta.blackAndWhiteContrast ? config.meta.blackAndWhiteContrast : false;
	return config;
}

/**
 * Writes the stylesheet file
 *
 * @param {string} theme
 * @param {string} fileName
 * @param {string} fileData
 */
function buildStylesheet(theme, fileName, fileData) {
	const filePath = path.resolve(STYLES_DIRECTORY, 'themes', theme, fileName);
	writeFile(
		filePath,
		fileData,
		path.relative(CSS_TEMPLATES_PATH, `${fileName}.handlebars`),
		path.relative(STYLES_DIRECTORY, filePath)
	);
}

/**
 * Writes the colors css stylesheet file
 *
 * Note: Currently this only builds and writes the colors.css (or
 * colors-variables) stylesheets for the default theme.
 * The main stylesheet for the default theme is the `root` colors.css
 * stylesheet.
 *
 * @param {string} theme
 * @param {Object} config
 */
function writeColorsCss(theme, config) {
	if (!theme) {
		return;
	}
	const fileName = 'color-variables.css';
	const fileData = parseCssTemplate([CSS_TEMPLATES_PATH, `section-${fileName}.handlebars`], {
		themeName: startCase(config.meta.name),
		baseColorVars: buildColorStylesheets.baseColors(config),
		themeColorVars: buildColorStylesheets.themeColors(config),
		textColors: buildColorStylesheets.textColors(config),
		extraColors: buildColorStylesheets.extraColors(config),
	});
	buildStylesheet(theme, fileName, fileData);
}

/**
 * Writes the sizes and sizes-variables stylesheets for the given theme.
 *
 * Note: Currently this only builds the root sizes.css stylesheet and 'default'
 * sizes-variables.css stylesheet.
 *
 * @param {string} theme
 * @param {Object} config
 */
function writeSizesCss(theme, config) {
	if (!theme) {
		return;
	}
	const fileName = 'size-variables.css';
	const fileData = parseCssTemplate([CSS_TEMPLATES_PATH, `section-${fileName}.handlebars`], {
		themeName: startCase(config.meta.name),
		fontSizes: buildSizesStylesheets.fontSizes(config),
		marginSizes: buildSizesStylesheets.marginSizes(config),
		paddingSizes: buildSizesStylesheets.paddingSizes(config),
		radiusSizes: buildSizesStylesheets.radiusSizes(config),
	});
	buildStylesheet(theme, fileName, fileData);
}

/**
 * Write the demo css file.
 *
 * @param {string} theme
 */
function writeCssDemoFile(theme) {
	const filePath = path.resolve(STYLES_DIRECTORY, 'themes', theme, 'demo', 'demo.css');
	writeFile(
		filePath,
		readFile([DEMO_TEMPLATES_PATH, 'demo.css']),
		path.relative(DEMO_TEMPLATES_PATH, 'demo.css'),
		path.relative(STYLES_DIRECTORY, filePath)
	);
}

/**
 * Write the main demo file template (index.html)
 *
 * @param {string} theme
 * @param {Object} config
 */
function writeCssDemoMainFile(theme, config) {
	const variableStylesheets = getCssFiles(config.folder, true);
	const baseStylesheets = getCssFiles('root');
	const overrideStylesheets = getCssFiles(config.folder);
	const fileData = parseCssTemplate([DEMO_TEMPLATES_PATH, 'main_template.html'], {
		themeName: config.meta.name,
		variableStylesheets: variableStylesheets.map(fileUtils.fixSlashes),
		baseStylesheets: baseStylesheets.map(fileUtils.fixSlashes),
		overrideStylesheets: overrideStylesheets.map(fileUtils.fixSlashes),
		demoSections: buildSectionTemplates(config),
	});
	const filePath = path.resolve(STYLES_DIRECTORY, 'themes', 'default', 'demo', 'index') + '.html';
	writeFile(
		filePath,
		fileData,
		path.relative(DEMO_TEMPLATES_PATH, 'main_template.html'),
		path.relative(STYLES_DIRECTORY, filePath)
	);
}

/**
 * Create the demo files for the given theme.
 *
 * @param {string} theme
 * @param {Object} config
 */
function createDemos(theme, config) {
	const destPath = path.resolve(STYLES_DIRECTORY, 'themes', theme, 'demo');
	process.stdout.write(chalk.magenta(`Writing css demo files: ${path.basename(destPath)}\n`));
	mkdirp.sync(path.dirname(destPath));
	writeCssDemoFile(theme);
	writeCssDemoMainFile(theme, config);
}

/**
 * Writes the index.js file as the entry point for the webpack build process.
 *
 * @param {string} theme
 */
function createIndexFile(theme) {
	process.stdout.write(chalk.magenta(`Creating index.js for styles: \n`));
	const indexPaths = getIndexPaths(theme);
	writeFile(
		[STYLES_DIRECTORY, 'themes', 'default', 'index.js'],
		indexPaths.map((file) => `import '${file}';`).join('\n')
	);
}

/**
 * Invoked for building the files.
 *
 * @param {string} theme
 */
function buildFiles(theme = 'default') {
	process.stdout.write(chalk.magenta('>> Building global CSS stylesheets (and demo) \n'));
	const config = setDefaultValues(themeConfig);
	writeColorsCss(theme, config);
	writeSizesCss(theme, config);
	createDemos(theme, config);
	createIndexFile(theme);
	process.stdout.write('\n' + chalk.reset.inverse.bold.green('DONE') + '\n');
}

buildFiles();
