/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import { EspressoButton } from '../../ui';

/**
 * @function
 * @param {Function} onClick
 * @param {boolean} submitting
 * @param {boolean} pristine
 * @param {string} buttonText
 * @param {string} htmlId
 * @param {string} htmlClass
 * @return {Object} rendered submit button for form
 */
const FormCancelButton = ( {
	onClick,
	pristine,
	submitting,
	buttonText: btnText,
	htmlId,
	htmlClass,
} ) => {
	const buttonText = btnText ? btnText : __( 'Cancel', 'event_espresso' );
	const classes = classNames( {
		[ htmlClass ]: htmlClass,
		'ee-form-button': true,
		'ee-form-button-cancel': true,
	} );
	return (
		<EspressoButton
			buttonText={ buttonText }
			id={ htmlId }
			htmlClass={ classes }
			onClick={ onClick }
			disabled={ submitting || pristine }
		/>
	);
};

FormCancelButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	buttonText: PropTypes.string,
	pristine: PropTypes.bool,
	submitting: PropTypes.bool,
	htmlId: PropTypes.string,
	htmlClass: PropTypes.string,
};

FormCancelButton.defaultProps = {
	buttonText: '',
	htmlId: '',
	htmlClass: '',
};

export default FormCancelButton;
