/**
 * @param {Array} children
 * @param {string} htmlClass
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableHeader = ( { children, htmlClass, ...extraProps } ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-rTable-header` :
		`ee-rTable-header`;
	return (
		<thead className={ htmlClass } { ...extraProps }>
			{ children }
		</thead>
	);
};

export default TableHeader;
