/**
 * @param {Array} children
 * @param {string} htmlClass
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableBody = ( { children, htmlClass, ...extraProps } ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-rTable-body` :
		`ee-rTable-body`;
	return (
		<tbody className={ htmlClass } { ...extraProps }>
			{ children }
		</tbody>
	);
};

export default TableBody;
