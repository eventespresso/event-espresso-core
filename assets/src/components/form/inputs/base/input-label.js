/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * generates an html <label> tag
 *
 * @function
 * @param {string} label
 * @param {string} htmlFor
 * @param {string} htmlClass
 * @param {boolean} required
 * @param {boolean} strong
 * @param {boolean} hidden
 * @param {Object} children
 * @param {Object} attributes
 * @return {string} rendered form label
 */
export const InputLabel = ( {
	label,
	htmlFor,
	htmlClass = '',
	required = false,
	strong = true,
	hidden = false,
	children,
	...attributes
} ) => {
	// add asterisk to label but not if it is for a checkbox or radio button
	const asterisk = required && children === undefined ?
		( <span className="required">*</span> ) :
		'';
	label = strong ? ( <strong>{ label }</strong> ) : label;

	htmlClass = classNames( {
		[ htmlClass ]: htmlClass,
		[ required ]: required,
		'col-form-label': ! hidden,
		'screen-reader-text': hidden,
	} );

	return (
		<label htmlFor={ htmlFor } className={ htmlClass } { ...attributes }>
			{ children }
			{ label }{ asterisk }
		</label>
	);
};

InputLabel.propTypes = {
	label: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	htmlFor: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	required: PropTypes.bool,
	strong: PropTypes.bool,
	children: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ),
};
