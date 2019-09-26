/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { IconButton } from '@wordpress/components';

/**
 * connects a WP CheckboxControl or ToggleControl with React-Final-Form
 *
 * @function
 * @param {string} icon
 * @param {Function} onClick
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
const EspressoIconButton = ( {
	icon,
	onClick,
	htmlId,
	htmlClass,
	helpTextID,
	dataSet,
	...attributes
} ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-toggle-input` :
		'ee-toggle-input';
	return (
		<IconButton
			icon={ icon }
			onClick={ onClick }
			id={ htmlId }
			className={ htmlClass }
			aria-describedby={ helpTextID }
			{ ...dataSet }
			{ ...attributes }
		/>
	);
};

EspressoIconButton.propTypes = {
	icon: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	htmlId: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
};

/**
 * @function
 * @param {Object} attributes
 * @return {Object} rendered input
 */
const IconButtonInput = ( attributes ) => {
	return (
		<Field
			component={ EspressoIconButton }
			{ ...attributes }
		/>
	);
};

export default IconButtonInput;
