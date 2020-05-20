/**
 * TypeScript copy of @wordpress/dom-ready
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/dom-ready/src/index.js
 */
const domReady = (callback: VoidFunction): void => {
	if (
		document?.readyState === 'complete' || // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.
		document?.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.
	) {
		return callback();
	}

	// DOMContentLoaded has not fired yet, delay callback until then.
	document?.addEventListener('DOMContentLoaded', callback);
};

export default domReady;
