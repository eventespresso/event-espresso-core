/**
 * @param {boolean} showFooter
 * @param {Array} children
 * @param {string} htmlClass
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableFooter = ( { showFooter, children, htmlClass, ...extraProps } ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-rTable-footer` :
		`ee-rTable-footer`;
	return showFooter ? (
		<tfoot className={ htmlClass } { ...extraProps }>
			{ children }
		</tfoot>
	) : null;
};

export default TableFooter;
