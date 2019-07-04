/**
 * @param {Array} children
 * @param {string} tableId
 * @param {string} tableClass
 * @param {string} captionID
 * @param {string} captionText
 * @param {Object} extraProps
 * @return {Object} rendered thead

 */
const Table = ( {
	children,
	tableId,
	tableClass,
	captionID,
	captionText,
	...extraProps,
} ) => {
	tableClass = tableClass ?
		`${ tableClass } ee-rspnsv-table` :
		'ee-rspnsv-table';
	return (
		<div
			role={ 'region' }
			aria-labelledby={ captionID }
			tabIndex="0"
		>
			<table id={ tableId } className={ tableClass } { ...extraProps }>
				<caption
					id={ captionID }
					className={ 'screen-reader-text' }
				>
					{ captionText }
				</caption>
				{ children }
			</table>
		</div>
	);
};

export default Table;
