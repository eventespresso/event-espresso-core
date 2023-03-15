import recast from 'recast';
import { readFileSync, writeFileSync } from 'fs';
import NormalModule from '../node_modules/webpack/lib/NormalModule.js';
import lodashPkg from 'lodash';
const { includes, isEmpty, isFunction } = lodashPkg;

class wpi18nExtractor {
	/**
	 * @function constructor
	 * @param options object
	 */
	constructor(options) {
		const DEFAULT_FUNCTIONS = ['__', '_n', '_x', '_nx', 'sprintf'];
		this.options = options || {};
		this.options.aliases = this.options.aliases || {};
		this.options.filename = this.options.filename || 'translation-map.json';
		this.options.excludes = this.options.excludes || [];
		this.translationMap = {};
		this.functionNames = this.options.functionNames || DEFAULT_FUNCTIONS;
	}

	/**
	 * @function apply
	 * @param compiler object
	 * @returns void
	 */
	apply = (compiler) => {
		const { processChunks } = this;
		const extractor = this;
		if (compiler.hasOwnProperty('hooks')) {
			compiler.hooks.thisCompilation.tap('webpack-i18n-map-extractor', (compilation) => {
				compilation.hooks.optimizeChunks.tap('webpack-i18n-map-extractor', (chunks) => {
					processChunks(chunks, extractor);
				});
			});
		}
	};

	/**
	 * @function processChunks
	 * @param chunks object
	 * @param extractor object
	 * @returns void
	 */
	processChunks = (chunks, extractor) => {
		const { options, translationMap, parseSourcesToMap } = extractor;
		// console.log('');
		// console.log('wpi18nExtractor::processChunks()');
		// console.log('%c chunks', 'color: Pink;', chunks);
		// console.log('%c options', 'color: HotPink;', options);
		let finalMap;
		chunks.forEach(function (chunk) {
			// only process if chunk.name is available and not in the list of chunks to exclude
			if (chunk.name && options.excludes.indexOf(chunk.name) === -1) {
				console.log('%c chunk', 'color: LimeGreen;', chunk.name);
				// get chunk.name from alias if it exists
				const chunkName = options.aliases.hasOwnProperty(chunk.name) ? options.aliases[chunk.name] : chunk.name;
				if (chunk.hasOwnProperty('_groups')) {
					console.log('%c chunk hasOwnProperty _groups', 'color: LimeGreen;');
					const [firstGroup] = chunk._groups;

					if (firstGroup.hasOwnProperty('_modulePreOrderIndices')) {
						// clone set then loop over elements and parse sources
						const modulePreOrderIndices = new Set(firstGroup._modulePreOrderIndices);
						modulePreOrderIndices.forEach(function (module) {
							parseSourcesToMap(module, chunkName, extractor);
						});
					}
				}
			}
		});
		//get existing json and merge
		try {
			finalMap = JSON.parse(readFileSync('./' + options.filename));
		} catch (e) {
			finalMap = {};
		}
		finalMap = Object.assign({}, finalMap, translationMap);
		writeFileSync('./' + options.filename, JSON.stringify(finalMap, null, 2), 'utf-8');
	};

	/**
	 * @function parseSourcesToMap
	 * @param source Set
	 * @param chunkName string
	 * @param extractor object
	 * @returns void
	 */
	parseSourcesToMap = (source, chunkName, extractor) => {
		console.log('');
		console.log('wpi18nExtractor::parseSourcesToMap()');
		const { getStringsFromModule } = extractor;
		console.error('chunkName', chunkName);
		source.forEach(
			// function (mapped, module) {
			(module) => {
				if (!(module instanceof NormalModule) || !isFunction(module.originalSource)) {
					return;
				}
				if (!extractor.translationMap.hasOwnProperty(chunkName)) {
					extractor.translationMap[chunkName] = [];
				}
				const translations = getStringsFromModule(module, extractor);
				console.log('');
				console.log('%c translations', 'color: HotPink;', translations);
				if (!isEmpty(translations)) {
					extractor.translationMap[chunkName] = extractor.translationMap[chunkName].concat(translations);
					console.log('*******************************************************');
					console.log(
						'%c extractor.translationMap[chunkName]',
						'color: LimeGreen;',
						extractor.translationMap[chunkName]
					);
					console.log('*******************************************************');
				}
			}
		);
	};

	/**
	 * @function getStringsFromModule
	 * @param module object
	 * @param extractor object
	 * @returns array
	 */
	getStringsFromModule = (module, extractor) => {
		const originalSource = module.originalSource();
		if (!isFunction(originalSource?.source)) {
			return [];
		}
		const source = originalSource.source();
		if (isEmpty(source)) {
			return [];
		}
		let translations = [];
		const { parse, types } = recast;
		try {
			const ast = parse(source);
			types.visit(ast, {
				visitCallExpression: function (path) {
					const node = path.node;
					if (includes(extractor.functionNames, node.callee.name) && node.arguments) {
						const translation = extractor.extractStringFromFunctionCall(
							types.getFieldValue(node, 'arguments'),
							node.callee.name
						);
						if (!isEmpty(translation)) {
							translations = translations.concat(translation);
						}
					}
					this.traverse(path);
				},
			});
		} catch (e) {
			//we just want to skip parsing errors.
		}
		return translations;
	};

	/**
	 * @function extractStringFromFunctionCall
	 * @param args array
	 * @param functionName string
	 * @returns string
	 */
	extractStringFromFunctionCall = (args, functionName) => {
		switch (functionName) {
			case '__':
			case 'sprintf':
			case '_n':
				return args[0].value;
			case '_x':
				return args[1].value + '\u0004' + args[0].value;
			case '_nx':
				return args[3].value + '\u0004' + args[0].value;
		}
		return '';
	};
}

export default wpi18nExtractor;
