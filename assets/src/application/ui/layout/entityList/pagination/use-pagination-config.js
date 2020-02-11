/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { _x } from '@eventespresso/i18n';

/**
 * tracks current page for any paginated list
 *
 * @param {Object} paginationConfig
 * @return {Object} - pagination config
 */
const usePaginationConfig = (paginationConfig) =>
	useMemo(() => {
		const defaultConfig = {
			labels: {
				first: _x('First', 'First thing in list', 'event_espresso'),
				last: _x('Last', 'Last thing in list', 'event_espresso'),
				prev: _x('Prev', 'Previous thing in list', 'event_espresso'),
				next: _x('Next', 'Next thing in list', 'event_espresso'),
			},
		};
		return { ...defaultConfig, ...paginationConfig };
	}, [paginationConfig]);

export default usePaginationConfig;
